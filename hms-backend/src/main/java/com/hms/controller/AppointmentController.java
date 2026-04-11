package com.hms.controller;

import com.hms.entity.Appointment;
import com.hms.entity.AppointmentStatus;
import com.hms.entity.Doctor;
import com.hms.entity.Patient;
import com.hms.service.AppointmentService;
import com.hms.service.DoctorService;
import com.hms.service.PatientService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.format.DateTimeParseException;
import java.util.Map;

import com.hms.dto.SlotDTO;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;

@RestController
@RequestMapping("/api/v1/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService service;
    private final DoctorService doctorService;
    private final PatientService patientService;
    private final com.hms.repository.UserRepository userRepository;

    @PostMapping("/book")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<?> bookAppointment(
            @Valid @RequestBody BookingRequest request,
            org.springframework.security.core.Authentication authentication
    ) {
        // 1. Get current logged-in user
        String username = authentication.getName();
        com.hms.entity.User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Profile access denied: user not found"));

        // 2. Get patient profile from user
        com.hms.entity.Patient patient = patientService.getPatientByUser(user)
                .orElseThrow(() -> new RuntimeException("Patient profile missing. Please complete your clinical profile."));

        // 3. Get doctor
        com.hms.entity.Doctor doctor = doctorService.getDoctorById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Specialist not found"));

        // 4. Combine date and time into LocalDateTime
        try {
            java.time.LocalTime time = java.time.LocalTime.parse(request.getAppointmentTime());
            java.time.LocalDateTime slotTime = request.getAppointmentDate().atTime(time);
            return ResponseEntity.ok(service.bookAppointment(doctor, patient, slotTime, request.getReason()));
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid time format. Expected HH:mm"));
        } catch (Exception e) {
            e.printStackTrace(); // Log full stack trace in backend console
            return ResponseEntity.internalServerError().body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/doctor/{doctorId}")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<List<Appointment>> getDoctorAppointments(@PathVariable("doctorId") Long doctorId) {
        Doctor doctor = doctorService.getDoctorById(doctorId).orElseThrow();
        return ResponseEntity.ok(service.getAppointmentsByDoctor(doctor));
    }

    @GetMapping("/patient/{patientId}")
    @PreAuthorize("hasRole('PATIENT') or hasRole('ADMIN')")
    public ResponseEntity<List<Appointment>> getPatientAppointments(@PathVariable("patientId") Long patientId) {
        Patient patient = patientService.getPatientById(patientId).orElseThrow();
        return ResponseEntity.ok(service.getAppointmentsByPatient(patient));
    }

    @GetMapping("/slots")
    public ResponseEntity<List<SlotDTO>> getSlots(
            @RequestParam("doctorId") Long doctorId,
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        return ResponseEntity.ok(service.getAvailableSlots(doctorId, date));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<Appointment> updateStatus(
            @PathVariable("id") Long id,
            @RequestParam("status") AppointmentStatus status
    ) {
        return ResponseEntity.ok(service.updateStatus(id, status));
    }

    @Data
    public static class BookingRequest {
        @NotNull(message = "Specialist selection is required")
        private Long doctorId;
        
        @NotNull(message = "Visit date is required")
        private LocalDate appointmentDate;
        
        @NotBlank(message = "Time slot selection is required")
        private String appointmentTime;
        
        @NotBlank(message = "Clinical narrative/reason is required")
        private String reason;
    }
}
