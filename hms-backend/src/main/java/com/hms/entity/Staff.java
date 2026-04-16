package com.hms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "staff")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String role; // Can be Nurse, Tech, Janitor, etc.
    private String shift; // Day, Night
    private String department;
    private String designation;
    private String qualification;
    private String contact;
}
