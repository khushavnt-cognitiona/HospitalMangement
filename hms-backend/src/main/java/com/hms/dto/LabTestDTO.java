package com.hms.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LabTestDTO {
    private Long id;
    private String testName;
    private String testCode;
    private String result;
    private String normalRange;
    private String unit;
    private Long patientId;
    private Long doctorId;
    private LocalDateTime testDate;
}
