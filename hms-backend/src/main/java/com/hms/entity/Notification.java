package com.hms.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;


@Entity
@Table(name = "notifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String message;

    @Enumerated(EnumType.STRING)
    @Column(length = 25)
    private NotificationType type;

    private boolean readStatus;
    private LocalDateTime timestamp;
}
