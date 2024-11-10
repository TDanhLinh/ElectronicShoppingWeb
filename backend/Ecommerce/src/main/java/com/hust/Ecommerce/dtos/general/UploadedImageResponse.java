package com.hust.Ecommerce.dtos.general;

import lombok.Data;

@Data
public class UploadedImageResponse {
    private String name;
    private String imageUrl;
    private String type;
}