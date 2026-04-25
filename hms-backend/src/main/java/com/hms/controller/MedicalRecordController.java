package com.hms.controller;

import com.hms.entity.MedicalRecord;
import com.hms.service.MedicalRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/records")
@RequiredArgsConstructor
public class MedicalRecordController {

    private final MedicalRecordService service;

    @GetMapping("/patient/{patientId}")
    @PreAuthorize("hasAuthority('ROLE_PATIENT') or hasAuthority('ROLE_DOCTOR') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<MedicalRecord>> getPatientRecords(@PathVariable("patientId") Long patientId) {
        return ResponseEntity.ok(service.getRecordsByPatient(patientId));
    }

    @PostMapping
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<MedicalRecord> createRecord(@RequestBody MedicalRecord record) {
        return ResponseEntity.ok(service.createRecord(record));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('PATIENT') or hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<MedicalRecord> getRecordById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(service.getRecordById(id).orElseThrow());
    }
}
