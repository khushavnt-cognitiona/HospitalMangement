package com.hms.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillingDTO {
    private Long id;
    private Long patientId;
    private Double amount;
    private String billingStatus;
    private Date billingDate;
    private String razorpayOrderId;
    private String description;
}
