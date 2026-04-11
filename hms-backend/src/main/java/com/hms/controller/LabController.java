package com.hms.controller;

import com.hms.entity.LabResult;
import com.hms.entity.LabTest;
import com.hms.service.LabService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/lab")
@RequiredArgsConstructor
public class LabController {

    private final LabService service;

    @GetMapping("/tests")
    public ResponseEntity<List<LabTest>> getAllTests() {
        return ResponseEntity.ok(service.getAllTests());
    }

    @PostMapping("/order")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<LabResult> orderTest(
            @RequestParam("testId") Long testId,
            @RequestParam("patientId") Long patientId,
            @RequestParam("doctorId") Long doctorId
    ) {
        return ResponseEntity.ok(service.orderTest(testId, patientId, doctorId));
    }

    @PutMapping("/results/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DOCTOR')")
    public ResponseEntity<LabResult> updateResult(
            @PathVariable("id") Long id,
            @RequestParam("value") String value,
            @RequestParam("normalRange") String normalRange
    ) {
        return ResponseEntity.ok(service.updateResult(id, value, normalRange));
    }

    @GetMapping("/patient/{patientId}")
    @PreAuthorize("hasRole('PATIENT') or hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<List<LabResult>> getPatientResults(@PathVariable("patientId") Long patientId) {
        return ResponseEntity.ok(service.getPatientResults(patientId));
    }
}
