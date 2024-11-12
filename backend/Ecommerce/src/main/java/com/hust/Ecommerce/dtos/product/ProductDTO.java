package com.hust.Ecommerce.dtos.product;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hust.Ecommerce.constants.MessageKeys;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    @NotBlank(message = MessageKeys.PRODUCT_TITLE_REQUIRED)
    @Size(min = 3, max = 200, message = MessageKeys.PRODUCT_TITLE_SIZE_REQUIRED)
    private String name;

    @Min(value = 0, message = MessageKeys.PRODUCT_PRICE_MIN_REQUIRED)
    @Max(value = 100000000, message = MessageKeys.PRODUCT_PRICE_MAX_REQUIRED)
    private Double price;

    private String thumbnail;
    private String description;

    @JsonProperty("category_id")
    private Long categoryId;

    private String brand;
    private String model;

    private String status;
    @JsonProperty("warranty_duration")
    private Long warrantyDuration;

    private Instant createdAt;
    private Instant updatedAt;
}
