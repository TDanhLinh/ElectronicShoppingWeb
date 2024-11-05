package com.hust.Ecommerce.dtos.general;

import lombok.Data;

@Data
public class ImageResponse {
    private Long id;
    private String imageUrl;
    private String type;
    private String name;
}
