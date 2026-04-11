package com.hms.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientDTO {
    private Long id;
    private Integer age;
    private String gender;
    private String contact;
    private String medicalHistory;
    private String profile;
    private UserDTO user;
}
