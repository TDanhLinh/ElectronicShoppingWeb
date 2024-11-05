package com.hust.Ecommerce.repositories.inventory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.hust.Ecommerce.entities.Inventory;
import com.hust.Ecommerce.entities.Product;

import java.util.List;

public interface InventoryRepository extends JpaRepository<Inventory, Long>, JpaSpecificationExecutor<Inventory> {

    List<Inventory> findByProduct(Product product);
}
