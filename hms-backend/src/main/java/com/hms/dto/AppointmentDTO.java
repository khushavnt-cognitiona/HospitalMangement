package com.hms.dto;

import com.hms.entity.AppointmentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentDTO {
    private Long id;
    private PatientDTO patient;
    private DoctorDTO doctor;
    private LocalDateTime appointmentTime;
    private String reason;
    private AppointmentStatus status;
}
