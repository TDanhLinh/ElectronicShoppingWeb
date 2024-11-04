package com.hust.Ecommerce.services;

import java.util.List;

import com.hust.Ecommerce.dtos.product.CategoryDTO;
import com.hust.Ecommerce.models.Category;

public interface ICategoryService {
    Category createCategory(CategoryDTO category);

    Category getCategoryById(Long categoryId);

    List<Category> getAllCategories();

    Category updateCategory(Long categoryId, CategoryDTO category);

    void deleteCategory(Long categoryId);
}
