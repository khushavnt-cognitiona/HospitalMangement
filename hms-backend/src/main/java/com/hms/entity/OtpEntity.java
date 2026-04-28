package com.hms.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "otps")
@Getter
@Setter
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
    private LocalDateTime expiryTime;

    // Use explicit boolean (not primitive) to avoid Lombok isUsed/getUsed ambiguity
    @Builder.Default
    @Column(name = "is_used", nullable = false)
    private Boolean isUsed = false;

    // Track failed verification attempts to enforce max-attempts security
    @Builder.Default
    @Column(name = "attempt_count", nullable = false)
    private Integer attemptCount = 0;
}
