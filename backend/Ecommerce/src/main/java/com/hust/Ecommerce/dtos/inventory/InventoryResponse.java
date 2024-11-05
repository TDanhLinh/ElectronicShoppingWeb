package com.hust.Ecommerce.dtos.inventory;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class InventoryResponse {
    private Long productId;
    private Integer amount;
    private Integer available;
    private Integer sold;
}
