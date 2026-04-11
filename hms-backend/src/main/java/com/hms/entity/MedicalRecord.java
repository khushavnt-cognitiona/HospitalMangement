package com.hms.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "medical_records")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    private String recordType; // DIARY, TEST_RESULT, CLINICAL_NOTE
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String fileUrl; // For storing links to files or reports
    private LocalDateTime createdAt;
}
