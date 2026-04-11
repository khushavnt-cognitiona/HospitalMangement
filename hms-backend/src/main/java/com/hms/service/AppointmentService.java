package com.hms.service;

import com.hms.entity.*;
import com.hms.dto.SlotDTO;
import java.time.LocalDate;
import java.util.List;
import java.time.LocalDateTime;

public interface AppointmentService {
    Appointment bookAppointment(Doctor doctor, Patient patient, LocalDateTime slotTime, String reason);
    List<Appointment> getAppointmentsByDoctor(Doctor doctor);
    List<Appointment> getAppointmentsByPatient(Patient patient);
    Appointment updateStatus(Long id, AppointmentStatus status);
    List<SlotDTO> getAvailableSlots(Long doctorId, LocalDate date);
}

