package com.hust.Ecommerce.dtos.general;

import lombok.Data;

@Data
public class ImageResponse {
    private Long id;
    private CloudinaryImageDTO image;

    private Boolean isThumbnail;
}
