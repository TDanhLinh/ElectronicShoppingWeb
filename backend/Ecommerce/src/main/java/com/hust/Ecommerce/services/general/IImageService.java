package com.hust.Ecommerce.services.general;

import org.springframework.web.multipart.MultipartFile;

public interface IImageService {
    public String uploadImage(MultipartFile file, String uploadFolder);

    public String deleteImage(String publicId);
}
