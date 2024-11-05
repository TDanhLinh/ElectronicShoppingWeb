package com.hust.Ecommerce.dtos.general;

import org.springframework.lang.Nullable;

import lombok.Data;

@Data
public class ImageRequest {
    @Nullable
    private Long id;
    private String imageUrl;
    private String type;
    private String name;
}
