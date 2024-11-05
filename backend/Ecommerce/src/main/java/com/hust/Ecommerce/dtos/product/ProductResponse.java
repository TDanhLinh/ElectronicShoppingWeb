package com.hust.Ecommerce.dtos.product;

import java.time.Instant;
import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.hust.Ecommerce.dtos.general.ImageResponse;

import lombok.Data;

@Data
public class ProductResponse {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private String name;
    private String slug;

    private String description;
    private List<ImageResponse> images;
    private Integer status;

    private Double price;
    private List<CategoryResponse> categories;

    private BrandResponse brand;

    private String unit;

    private JsonNode specifications;

    private Double weight;

    private Long warrantyDuration;
}
