package com.hust.Ecommerce.dtos.product;

import java.util.List;

import org.springframework.lang.Nullable;

import com.fasterxml.jackson.databind.JsonNode;
import com.hust.Ecommerce.dtos.general.ImageRequest;

import lombok.Data;

@Data
public class ProductRequest {
    private String name;
    private String slug;
    private String description;
    private String thumbnail;
    private List<ImageRequest> images;
    private Integer status;

    private Double price;
    private List<Long> categoryIds;

    private Long brandId;

    private String unit;

    private Double weight;

    private JsonNode specifications;

    private Long warrantyDuration;

    // tao inventory ngay khi tao san pham
    @Nullable
    private ProductRequest.InventoryProductRequest inventory;

    @Data
    public static class InventoryProductRequest {
        private Integer amount;
        private Integer available;
        private Integer sold = 0;

    }

}
