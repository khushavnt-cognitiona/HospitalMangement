package com.hms.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StaffDTO {
    private Long id;
    private String department;
    private String designation;
    private String qualification;
    private String contact;
    private UserDTO user;
}
