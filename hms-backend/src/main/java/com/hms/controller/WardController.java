package com.hms.controller;

import com.hms.entity.Ward;
import com.hms.service.WardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/wards")
@RequiredArgsConstructor
public class WardController {

    private final WardService service;

    @GetMapping
    public ResponseEntity<List<Ward>> getAllWards() {
        return ResponseEntity.ok(service.getAllWards());
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Ward> createWard(@RequestBody Ward ward) {
        return ResponseEntity.ok(service.createWard(ward));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Ward> updateWard(@PathVariable("id") Long id, @RequestBody Ward ward) {
        return ResponseEntity.ok(service.updateWard(id, ward));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteWard(@PathVariable("id") Long id) {
        service.deleteWard(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/beds")
    public ResponseEntity<List<com.hms.entity.Bed>> getBeds(@PathVariable("id") Long id) {
        return ResponseEntity.ok(service.getBedsByWard(id));
    }

    @PatchMapping("/beds/{bedId}/status")
    @PreAuthorize("hasAuthority('ROLE_NURSE') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<com.hms.entity.Bed> updateBedStatus(@PathVariable("bedId") Long bedId, @RequestParam("occupied") boolean occupied) {
        return ResponseEntity.ok(service.updateBedStatus(bedId, occupied));
    }

    @PostMapping("/beds/{bedId}/allocate")
    @PreAuthorize("hasAuthority('ROLE_NURSE') or hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<com.hms.entity.Bed> allocateBed(@PathVariable("bedId") Long bedId, @RequestParam("patientId") Long patientId) {
        return ResponseEntity.ok(service.allocateBed(bedId, patientId));
    }
}
