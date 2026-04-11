package com.hms.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorDTO {
    private Long id;
    private String specialization;
    private String qualification;
    private String availabilitySlots;
    private boolean available;
    private Double consultationFee;
    private Integer experienceYears;
    private String profile;
    private UserDTO user;
}
