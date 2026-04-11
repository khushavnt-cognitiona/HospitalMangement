package com.hms.controller;

import com.hms.entity.Staff;
import com.hms.service.StaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/staff")
@RequiredArgsConstructor
public class StaffController {

    private final StaffService staffService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Staff>> getAllStaff() {
        return ResponseEntity.ok(staffService.getAllStaff());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Staff> createStaff(@RequestBody Staff staff) {
        return ResponseEntity.ok(staffService.createStaff(staff));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Staff> updateStaff(@PathVariable("id") Long id, @RequestBody Staff staff) {
        return ResponseEntity.ok(staffService.updateStaff(id, staff));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteStaff(@PathVariable("id") Long id) {
        staffService.deleteStaff(id);
        return ResponseEntity.ok().build();
    }
}
