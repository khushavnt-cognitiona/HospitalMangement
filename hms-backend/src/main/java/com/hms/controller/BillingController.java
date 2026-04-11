package com.hms.controller;

import com.hms.entity.Billing;
import com.hms.entity.Patient;
import com.hms.service.BillingService;
import com.hms.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/billing")
@RequiredArgsConstructor
public class BillingController {

    private final BillingService billingService;
    private final PatientService patientService;

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DOCTOR')")
    public ResponseEntity<Billing> createBill(
            @RequestParam Long patientId,
            @RequestParam Double amount,
            @RequestParam String description
    ) {
        Patient patient = patientService.getPatientById(patientId).orElseThrow();
        return ResponseEntity.ok(billingService.createBill(patient, amount, description));
    }

    @PostMapping("/process/{id}")
    @PreAuthorize("hasRole('PATIENT') or hasRole('ADMIN')")
    public ResponseEntity<Billing> processPayment(
            @PathVariable("id") Long id,
            @RequestParam("razorpayOrderId") String razorpayOrderId
    ) {
        return ResponseEntity.ok(billingService.processPayment(id, razorpayOrderId));
    }

    @GetMapping("/patient/{patientId}")
    @PreAuthorize("hasRole('PATIENT') or hasRole('ADMIN')")
    public ResponseEntity<List<Billing>> getPatientBills(@PathVariable("patientId") Long patientId) {
        Patient patient = patientService.getPatientById(patientId).orElseThrow();
        return ResponseEntity.ok(billingService.getBillingHistory(patient));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Billing>> getAllBills() {
        return ResponseEntity.ok(billingService.getAllBills());
    }
}
