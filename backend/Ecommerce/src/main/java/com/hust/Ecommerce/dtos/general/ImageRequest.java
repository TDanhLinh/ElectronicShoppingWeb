package com.hust.Ecommerce.dtos.general;

import lombok.Data;

import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class ImageRequest {
    private CloudinaryImageDTO image;
    private Boolean isThumbnail;
}
