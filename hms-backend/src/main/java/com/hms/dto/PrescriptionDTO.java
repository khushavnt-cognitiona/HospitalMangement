package com.hms.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrescriptionDTO {
    private Long id;
    private AppointmentDTO appointment;
    private String medicine;
    private String dosage;
    private String frequency;
    private String instructions;
    private Date date;
}
