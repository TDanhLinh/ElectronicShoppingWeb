package com.hust.Ecommerce.services.Impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hust.Ecommerce.constants.MessageKeys;
import com.hust.Ecommerce.dtos.product.CategoryDTO;
import com.hust.Ecommerce.models.Category;
import com.hust.Ecommerce.repositories.CategoryRepository;
import com.hust.Ecommerce.services.ICategoryService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class CategoryServiceImpl implements ICategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public Category createCategory(CategoryDTO category) {

        Category newCategory = new Category();
        newCategory.setName(category.getName());

        log.debug("request to create category {}", category.getName());
        return categoryRepository.save(newCategory);
    }

    @Override
    @Transactional(readOnly = true)
    public Category getCategoryById(Long categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException(MessageKeys.NOT_FOUND));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category updateCategory(Long categoryId, CategoryDTO categoryDTO) {
        Category oldCategory = getCategoryById(categoryId);
        oldCategory.setName(categoryDTO.getName());
        return categoryRepository.save(oldCategory);
    }

    @Override
    public void deleteCategory(Long categoryId) {
        Category deleteCategory = getCategoryById(categoryId);
        // xoá cứng trong DB
        categoryRepository.delete(deleteCategory);
    }

}
