package com.hms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "beds")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bedNumber;

    @Builder.Default
    private boolean occupied = false;

    @ManyToOne
    @JoinColumn(name = "ward_id")
    private Ward ward;

    @OneToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
}
