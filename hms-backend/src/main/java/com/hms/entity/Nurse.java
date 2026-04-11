package com.hms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "nurses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Nurse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String wardAssigned; // Ward ID or name
}
