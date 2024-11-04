package com.hust.Ecommerce.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hust.Ecommerce.models.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
