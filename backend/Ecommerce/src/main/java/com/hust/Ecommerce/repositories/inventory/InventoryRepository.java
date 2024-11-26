package com.hust.Ecommerce.repositories.inventory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.hust.Ecommerce.entities.inventory.Inventory;

public interface InventoryRepository extends JpaRepository<Inventory, Long>,
        JpaSpecificationExecutor<Inventory> {

}
