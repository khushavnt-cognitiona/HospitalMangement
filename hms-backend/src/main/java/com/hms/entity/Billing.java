package com.hms.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "billing")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Billing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;
    private LocalDateTime billingDate;
    private String billingStatus; // PENDING, PAID, FAILED
    private String description;
    private String razorpayOrderId;
    private String paymentMethod;
    private String transactionId;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @OneToOne
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;
}
