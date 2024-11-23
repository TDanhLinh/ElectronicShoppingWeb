package com.hust.Ecommerce.dtos.inventory;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class InventoryRequest {
    @NotNull
    private Long productId;
    private Integer amount;
    private Integer available;
    private Integer sold = 0;

}
