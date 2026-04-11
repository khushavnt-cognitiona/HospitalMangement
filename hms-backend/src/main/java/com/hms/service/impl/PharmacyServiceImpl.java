package com.hms.service.impl;

import com.hms.entity.Inventory;
import com.hms.entity.Medicine;
import com.hms.repository.InventoryRepository;
import com.hms.repository.MedicineRepository;
import com.hms.service.PharmacyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PharmacyServiceImpl implements PharmacyService {

    private final MedicineRepository medicineRepository;
    private final InventoryRepository inventoryRepository;

    @Override
    public Medicine addMedicine(Medicine medicine, Integer initialStock) {
        Medicine savedMedicine = medicineRepository.save(medicine);
        Inventory inventory = new Inventory();
        inventory.setMedicine(savedMedicine);
        inventory.setQuantity(initialStock);
        inventory.setStatus(initialStock > 10 ? "IN_STOCK" : "LOW_STOCK");
        inventoryRepository.save(inventory);
        return savedMedicine;
    }

    @Override
    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    @Override
    public void updateStock(Long medicineId, Integer quantity) {
        Medicine medicine = medicineRepository.findById(medicineId).orElseThrow();
        Inventory inventory = inventoryRepository.findByMedicine(medicine)
                .orElseGet(() -> {
                    Inventory newInv = new Inventory();
                    newInv.setMedicine(medicine);
                    newInv.setQuantity(0);
                    return newInv;
                });
        
        inventory.setQuantity(inventory.getQuantity() + quantity);
        inventory.setStatus(inventory.getQuantity() > 10 ? "IN_STOCK" : "LOW_STOCK");
        inventoryRepository.save(inventory);
    }

    @Override
    public List<Medicine> searchMedicines(String query) {
        return medicineRepository.findByNameContainingIgnoreCase(query);
    }
}
