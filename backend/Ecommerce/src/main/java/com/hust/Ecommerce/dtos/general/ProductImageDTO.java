package com.hust.Ecommerce.dtos.general;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hust.Ecommerce.constants.MessageKeys;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductImageDTO {
    @JsonProperty("product_id")
    @Min(value = 1, message = MessageKeys.PRODUCT_ID_REQUIRED)
    private Long productId;

    @Size(min = 5, max = 300, message = MessageKeys.IMAGE_SIZE_REQUIRED)
    @JsonProperty("image_url")
    private String imageUrl;

    @JsonProperty("type")
    private String type;
}
