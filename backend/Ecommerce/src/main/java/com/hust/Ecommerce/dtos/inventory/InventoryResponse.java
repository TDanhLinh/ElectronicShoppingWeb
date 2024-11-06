package com.hust.Ecommerce.dtos.inventory;

import java.time.Instant;

import lombok.Data;

@Data
public class InventoryResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private InventoryResponse.ProductInventoryResponse product;
    private Integer amount;
    private Integer available;
    private Integer sold;

    @Data
    public static class ProductInventoryResponse {
        private Long id;
        private String name;
        private String descrition;

    }
}
