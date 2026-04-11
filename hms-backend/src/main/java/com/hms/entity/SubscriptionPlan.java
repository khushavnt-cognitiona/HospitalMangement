package com.hms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "subscription_plans")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubscriptionPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // BASIC, PREMIUM, ENTERPRISE
    private String description;
    private Double price;
    private Integer durationDays;
}
