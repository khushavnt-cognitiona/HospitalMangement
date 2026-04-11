package com.hms.controller;

import com.hms.entity.Doctor;
import com.hms.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService service;

    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        return ResponseEntity.ok(service.getAllDoctors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(service.getDoctorById(id).orElseThrow());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<Doctor> updateDoctor(
            @PathVariable("id") Long id,
            @RequestBody Doctor doctorDetails
    ) {
        return ResponseEntity.ok(service.updateDoctor(id, doctorDetails));
    }
}
