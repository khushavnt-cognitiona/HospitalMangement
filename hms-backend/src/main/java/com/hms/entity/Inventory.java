package com.hms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "inventory")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "medicine_id")
    private Medicine medicine;

    private Integer quantity;
    private Integer reorderLevel;
    private String status;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Medicine getMedicine() { return medicine; }
    public void setMedicine(Medicine medicine) { this.medicine = medicine; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Integer getReorderLevel() { return reorderLevel; }
    public void setReorderLevel(Integer reorderLevel) { this.reorderLevel = reorderLevel; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public static class InventoryBuilder {
        public InventoryBuilder quantity(Integer quantity) {
            this.quantity = quantity;
            return this;
        }
    }
}
