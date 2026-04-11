package com.hms.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "lab_results")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LabResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "test_id")
    private LabTest test;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor prescribedBy;

    private String resultValue;
    private String normalRange;
    private String status;
    private LocalDateTime resultDate;
}
