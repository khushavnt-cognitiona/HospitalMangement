package com.hms.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "otps")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OtpEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String target; // email or phone

    @Column(nullable = false)
    private String otp;

    @Column(nullable = false)
    private java.time.LocalDateTime expiryTime;

    @Builder.Default
    private boolean isUsed = false;
}
