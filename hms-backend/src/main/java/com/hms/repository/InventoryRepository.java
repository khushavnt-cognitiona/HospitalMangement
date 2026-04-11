package com.hms.repository;

import com.hms.entity.Inventory;
import com.hms.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    Optional<Inventory> findByMedicine(Medicine medicine);
}
