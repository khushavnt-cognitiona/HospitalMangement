package com.hms.service.impl;

import com.hms.entity.*;
import com.hms.repository.AppointmentRepository;
import com.hms.repository.NotificationRepository;
import com.hms.repository.DoctorRepository;
import com.hms.service.AppointmentService;
import com.hms.dto.SlotDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository repository;
    private final DoctorRepository doctorRepository;
    private final com.hms.service.OtpService otpService;
    private final com.hms.service.NotificationService notificationService;

    @Override
    public Appointment bookAppointment(Doctor doctor, Patient patient, LocalDateTime slotTime, String reason) {
        Appointment appointment = Appointment.builder()
                .doctor(doctor)
                .patient(patient)
                .slotTime(slotTime)
                .appointmentDate(slotTime.toLocalDate())
                .appointmentTime(slotTime.toLocalTime().toString())
                .reason(reason)
                .status(AppointmentStatus.PENDING_VERIFICATION)
                .build();

        Appointment savedAppointment = repository.save(appointment);
        
        // Trigger OTP for booking confirmation
        if (patient.getUser() != null && patient.getUser().getEmail() != null) {
            otpService.generateOtp(patient.getUser().getEmail());
        }

        return savedAppointment;
    }

    @Override
    public boolean verifyBookingOtp(Long appointmentId, String otp) {
        Appointment appointment = repository.findById(appointmentId).orElseThrow();
        if (appointment.getStatus() != AppointmentStatus.PENDING_VERIFICATION) {
            return false;
        }

        User patientUser = appointment.getPatient().getUser();
        if (patientUser != null && otpService.verifyOtp(patientUser.getEmail(), otp)) {
            appointment.setStatus(AppointmentStatus.BOOKED);
            repository.save(appointment);

            // Send Final Confirmation Notifications
            String doctorName = appointment.getDoctor().getUser() != null ? appointment.getDoctor().getUser().getName() : "Specialist";
            String patientName = patientUser.getName() != null ? patientUser.getName() : "Patient";

            notificationService.createNotification(appointment.getDoctor().getUser(), 
                "Confirmed: New appointment with " + patientName + " at " + appointment.getSlotTime(),
                NotificationType.IN_APP);
            
            notificationService.createNotification(patientUser, 
                "Verified: Your appointment with Dr. " + doctorName + " is confirmed for " + appointment.getSlotTime(),
                NotificationType.IN_APP);

            return true;
        }
        return false;
    }

    @Override
    public List<Appointment> getAppointmentsByDoctor(Doctor doctor) {
        return repository.findByDoctor(doctor);
    }

    @Override
    public List<Appointment> getAppointmentsByPatient(Patient patient) {
        return repository.findByPatient(patient);
    }

    @Override
    public Appointment updateStatus(Long id, AppointmentStatus status) {
        Appointment appointment = repository.findById(id).orElseThrow();
        appointment.setStatus(status);

        String msg = "Appointment status updated to " + status;
        notificationService.createNotification(appointment.getDoctor().getUser(), msg, NotificationType.IN_APP);
        notificationService.createNotification(appointment.getPatient().getUser(), msg, NotificationType.IN_APP);

        return repository.save(appointment);
    }

    @Override
    public List<SlotDTO> getAvailableSlots(Long doctorId, LocalDate date) {
        try {
            if (doctorId == null || date == null) {
                System.err.println("INVALID PARAMS: doctorId=" + doctorId + ", date=" + date);
                return List.of();
            }

            System.err.println("Scanning availability for doctor ID: " + doctorId + " on date: " + date);
            
            java.util.Optional<Doctor> doctorOpt = doctorRepository.findById(doctorId);
            if (doctorOpt.isEmpty()) {
                System.err.println("DOCTOR NOT FOUND: ID=" + doctorId);
                return List.of();
            }
            Doctor doctor = doctorOpt.get();
            
            String slotsStr = doctor.getAvailabilitySlots();
            if (slotsStr == null || slotsStr.trim().isEmpty()) {
                System.err.println("EMPTY SLOTS for doctor=" + doctorId);
                return List.of();
            }

            // Sunday and Holiday exclusion
            if (date.getDayOfWeek() == java.time.DayOfWeek.SUNDAY || isHoliday(date)) {
                System.err.println("EXCLUSION (Sunday/Holiday) for doctor=" + doctorId + " date=" + date);
                return List.of();
            }

            System.err.println("RAW SLOTS: " + slotsStr);
            String[] slots = slotsStr.split(",");
            
            List<Appointment> appointments;
            try {
                LocalDateTime startOfDay = date.atStartOfDay();
                LocalDateTime endOfDay = date.atTime(23, 59, 59);
                appointments = repository.findByDoctorAndSlotTimeBetween(doctor, startOfDay, endOfDay);
            } catch (Exception e) {
                System.err.println("DB QUERY FAILED: " + e.getMessage());
                // Fallback to in-memory filter if query method fails
                appointments = repository.findByDoctor(doctor);
            }
            final List<Appointment> existingAppointments = appointments;

            return Arrays.stream(slots)
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .map(s -> {
                        try {
                            // Pad time if needed (e.g., "9:00" -> "09:00")
                            String paddedTime = s.length() == 4 && s.contains(":") && s.indexOf(":") == 1 ? "0" + s : s;
                            LocalTime time = LocalTime.parse(paddedTime);
                            
                            boolean isBooked = false;
                            if (existingAppointments != null) {
                                isBooked = existingAppointments.stream()
                                        .filter(a -> a.getSlotTime() != null)
                                        .anyMatch(a -> a.getSlotTime().toLocalDate().equals(date) && 
                                                     a.getSlotTime().toLocalTime().equals(time) && 
                                                     a.getStatus() != AppointmentStatus.CANCELLED);
                            }
                            
                            return SlotDTO.builder()
                                    .id(paddedTime)
                                    .time(paddedTime)
                                    .isBooked(isBooked)
                                    .build();
                        } catch (Exception e) {
                            System.err.println("SLOT PARSE ERROR '" + s + "': " + e.getMessage());
                            return null;
                        }
                    })
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("FATAL SCAN ERROR: " + e.getMessage());
            e.printStackTrace();
            return List.of(); // Return empty instead of 500
        }
    }

    private boolean isHoliday(LocalDate date) {
        int day = date.getDayOfMonth();
        int month = date.getMonthValue();
        return (month == 1 && day == 26) || (month == 8 && day == 15) || 
               (month == 10 && day == 2) || (month == 12 && day == 25);
    }
}
