package com.hms.service;

import com.hms.entity.Inventory;
import com.hms.entity.Medicine;
import java.util.List;

public interface PharmacyService {
    Medicine addMedicine(Medicine medicine, Integer initialStock);
    List<Inventory> getAllInventory();
    void updateStock(Long medicineId, Integer quantity);
    List<Medicine> searchMedicines(String query);
}
