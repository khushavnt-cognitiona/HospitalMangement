package com.hms.controller;

import com.hms.entity.Inventory;
import com.hms.entity.Medicine;
import com.hms.service.PharmacyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pharmacy")
@RequiredArgsConstructor
public class PharmacyController {

    private final PharmacyService service;

    @PostMapping("/medicines")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Medicine> addMedicine(@RequestBody Medicine medicine, @RequestParam("initialStock") Integer initialStock) {
        return ResponseEntity.ok(service.addMedicine(medicine, initialStock));
    }

    @GetMapping("/inventory")
    public ResponseEntity<List<Inventory>> getInventory() {
        return ResponseEntity.ok(service.getAllInventory());
    }

    @PostMapping("/inventory/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> updateStock(@PathVariable("id") Long id, @RequestParam("quantity") Integer quantity) {
        service.updateStock(id, quantity);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/medicines/search")
    public ResponseEntity<List<Medicine>> searchMedicines(@RequestParam("query") String query) {
        return ResponseEntity.ok(service.searchMedicines(query));
    }
}
