package com.hms.dto;

import com.hms.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private String name;
    private Role role;
    
    // Doctor Specific
    private String specialization;
    private String qualification;
    private Boolean available;
    private Double consultationFee;
    private Integer experienceYears;
    
    // Patient Specific
    private Integer age;
    private String gender;
    private String contact;
    
    // Nurse Specific
    private String wardAssigned;
}
