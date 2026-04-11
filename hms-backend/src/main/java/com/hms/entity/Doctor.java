package com.hms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "doctors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String specialization;
    private String qualification;
    private String availabilitySlots;
    @Builder.Default
    private boolean available = true;
    private Double consultationFee;
    private Integer experienceYears;
    @Column(columnDefinition = "TEXT")
    private String profile;

    @Column(name = "profile_image_url")
    private String profileImageUrl;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}
