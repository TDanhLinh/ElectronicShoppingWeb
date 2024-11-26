package com.hust.Ecommerce.repositories.inventory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hust.Ecommerce.entities.inventory.Inventory;

public interface InventoryRepository extends JpaRepository<Inventory, Long>,
                JpaSpecificationExecutor<Inventory> {

        @Query("SELECT i.available FROM Inventory i WHERE i.variant.id = :variantId")
        Integer findAvailableByVariantId(@Param("variantId") Long variantId);
}
