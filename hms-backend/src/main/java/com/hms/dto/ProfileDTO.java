package com.hms.dto;

import com.hms.entity.Role;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileDTO {
    private Long id;
    private String username;
    private String email;
    private String name;
    private Role role;
    private String phone;
    private String address;
    private String bloodGroup;
    private String profileImage;
    private String dateOfBirth;
    private String emergencyContact;
    private String knownAllergies;
    
    // Patient specific clinical fields (if role is PATIENT)
    private Integer age;
    private String gender;
    private String medicalHistory;
}
