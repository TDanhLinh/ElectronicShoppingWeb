package com.hust.Ecommerce.controllers.general;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hust.Ecommerce.dtos.CollectionWrapper;
import com.hust.Ecommerce.dtos.general.UploadedImageResponse;
import com.hust.Ecommerce.services.general.IImageService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
@Slf4j
public class ImageController {

    private final IImageService imageService;

    @PostMapping(value = "/upload-single", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> uploadSingleImage(@RequestParam("image") MultipartFile image,
            @RequestParam("folder") String folder) {
        String uploadImageUrl = imageService.uploadImage(image, folder);
        return ResponseEntity.ok(uploadImageUrl);

    }

    @PostMapping("/upload-multiple")
    public ResponseEntity<CollectionWrapper<String>> uploadMultipleImages(
            @RequestParam("images") MultipartFile[] images, @RequestParam("folder") String folder) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CollectionWrapper<>(Stream.of(images)
                        .map(image -> imageService.uploadImage(image, folder))
                        .collect(Collectors.toList())));
    }

    @DeleteMapping("/cloud/single-image")
    public ResponseEntity<Void> deleteImage(@RequestBody String imageName) {
        imageService.deleteImage(imageName);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/cloud/multi-image")
    public ResponseEntity<Void> deleteMultipleImages(@RequestBody List<String> imageNames) {
        imageNames.forEach(imageService::deleteImage);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
