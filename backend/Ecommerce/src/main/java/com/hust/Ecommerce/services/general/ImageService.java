package com.hust.Ecommerce.services.general;

import org.springframework.web.multipart.MultipartFile;

import com.hust.Ecommerce.dtos.general.ImageRequest;

public interface ImageService {
    public ImageRequest uploadImage(MultipartFile file, String uploadFolder);

    public String deleteImage(String publicId);
}
