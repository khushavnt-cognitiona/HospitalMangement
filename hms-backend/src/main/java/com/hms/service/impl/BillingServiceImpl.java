package com.hms.service.impl;

import com.hms.entity.*;
import com.hms.repository.BillingRepository;
import com.hms.repository.NotificationRepository;
import com.hms.service.BillingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BillingServiceImpl implements BillingService {

    private final BillingRepository billingRepository;
    private final NotificationRepository notificationRepository;

    @Override
    public Billing createBill(Patient patient, Double amount, String description) {
        Billing bill = Billing.builder()
                .patient(patient)
                .amount(amount)
                .description(description)
                .billingStatus("PENDING")
                .billingDate(LocalDateTime.now())
                .build();
        
        Billing savedBill = billingRepository.save(bill);
        
        sendNotification(patient.getUser(), "New bill generated for " + description + ": Amount: " + amount);
        
        return savedBill;
    }

    @Override
    public Billing processPayment(Long id, String razorpayOrderId) {
        Billing bill = billingRepository.findById(id).orElseThrow();
        bill.setBillingStatus("PAID");
        bill.setRazorpayOrderId(razorpayOrderId);
        
        Billing savedBill = billingRepository.save(bill);
        
        sendNotification(bill.getPatient().getUser(), "Payment successful for Bill ID: " + bill.getId());
        
        return savedBill;
    }

    @Override
    public List<Billing> getBillingHistory(Patient patient) {
        return billingRepository.findByPatient(patient);
    }

    @Override
    public List<Billing> getAllBills() {
        return billingRepository.findAll();
    }

    private void sendNotification(User user, String message) {
        Notification notification = Notification.builder()
                .user(user)
                .message(message)
                .type(NotificationType.IN_APP)
                .readStatus(false)
                .timestamp(LocalDateTime.now())
                .build();
        notificationRepository.save(notification);
    }
}
