package com.hms.service;

import com.hms.entity.Billing;
import com.hms.entity.Patient;
import java.util.List;

public interface BillingService {
    Billing createBill(Patient patient, Double amount, String description);
    Billing processPayment(Long id, String razorpayOrderId);
    List<Billing> getBillingHistory(Patient patient);
    List<Billing> getAllBills();
}
