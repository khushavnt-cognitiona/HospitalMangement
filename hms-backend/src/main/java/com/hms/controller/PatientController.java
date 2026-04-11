package com.hms.controller;

import com.hms.entity.Patient;
import com.hms.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/patients")
@RequiredArgsConstructor
public class PatientController {

    private final PatientService service;

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(service.getPatientById(id).orElseThrow());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Patient> getPatientByUserId(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(service.getPatientByUserId(userId).orElseThrow());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('PATIENT') or hasRole('ADMIN')")
    public ResponseEntity<Patient> updatePatient(
            @PathVariable("id") Long id,
            @RequestBody Patient patientDetails
    ) {
        return ResponseEntity.ok(service.updatePatient(id, patientDetails));
    }
}
