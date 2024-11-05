package com.hust.Ecommerce.repositories.general;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hust.Ecommerce.entities.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {

    List<Image> findByProductId(Long productId);
}
