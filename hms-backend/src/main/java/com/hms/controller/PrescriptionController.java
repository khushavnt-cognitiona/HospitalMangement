package com.hms.controller;

import com.hms.entity.Prescription;
import com.hms.service.PrescriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/prescriptions")
@RequiredArgsConstructor
public class PrescriptionController {

    private final PrescriptionService service;

    @PostMapping("/create")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<Prescription> createPrescription(
            @RequestParam("appointmentId") Long appointmentId,
            @RequestParam("medicines") String medicines,
            @RequestParam("diagnosis") String diagnosis,
            @RequestParam("notes") String notes
    ) {
        return ResponseEntity.ok(service.createPrescription(appointmentId, medicines, diagnosis, notes));
    }

    @GetMapping("/appointment/{id}")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('PATIENT') or hasRole('NURSE') or hasRole('ADMIN')")
    public ResponseEntity<Prescription> getByAppointment(@PathVariable("id") Long id) {
        Optional<Prescription> p = service.getPrescriptionByAppointment(id);
        return p.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
