package com.hust.Ecommerce.services.Impl;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hust.Ecommerce.constants.MessageKeys;
import com.hust.Ecommerce.dtos.general.ProductImageDTO;
import com.hust.Ecommerce.dtos.product.ProductDTO;
import com.hust.Ecommerce.exceptions.payload.ResourceNotFoundException;
import com.hust.Ecommerce.models.Category;
import com.hust.Ecommerce.models.Image;
import com.hust.Ecommerce.models.Product;
import com.hust.Ecommerce.repositories.ProductRepository;
import com.hust.Ecommerce.services.ICategoryService;
import com.hust.Ecommerce.services.IProductService;

import com.hust.Ecommerce.services.maper.ProductMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements IProductService {

    private final ProductRepository productRepository;
    private final ICategoryService categoryService;
    private final ProductMapper productMapper;

    @Override
    @Transactional
    public Product createProduct(ProductDTO productDTO) throws ResourceNotFoundException {
        Category existsCategory = categoryService.getCategoryById(productDTO.getCategoryId());

        Product savedProduct = productMapper.toProduct(productDTO);
        savedProduct.setCategory(existsCategory);

        log.debug("create new product : ");
        return productRepository.save(savedProduct);
    }

    @Override
    public Product getProductById(Long productId) throws ResourceNotFoundException {
        return productRepository
                .findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException(MessageKeys.PRODUCT_NOT_FOUND + productId));
    }

    @Override
    @Transactional
    public Product updateProduct(Long id, ProductDTO productDTO) throws ResourceNotFoundException {
        Product existsProduct = getProductById(id);
        if (existsProduct != null) {
            // copy các thuộc tính từ DTO -> Product
            Category existsCategory = categoryService.getCategoryById(productDTO.getCategoryId());

            existsProduct.setName(productDTO.getName());
            existsProduct.setCategory(existsCategory);
            existsProduct.setPrice(productDTO.getPrice());
            existsProduct.setDescription(productDTO.getDescription());
            existsProduct.setThumbnail(productDTO.getThumbnail());
            existsProduct.setBrand(productDTO.getBrand());
            existsProduct.setStatus(productDTO.getStatus());
            existsProduct.setWarrantyDuration(productDTO.getWarrantyDuration());
            return productRepository.save(existsProduct);
        }

        return null;
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        // tìm ra product
        Product deleteProduct = getProductById(id);
        log.debug("delete product {}", deleteProduct);
        productRepository.delete(deleteProduct);
    }

    @Override
    public boolean existsProduct(String name) {
        return productRepository.existsByName(name);
    }

    @Override
    public Product getDetailProducts(long productId) throws ResourceNotFoundException {
        Optional<Product> optionalProduct = productRepository.getDetailProducts(productId);
        if (optionalProduct.isPresent()) {
            return optionalProduct.get();
        }
        throw new ResourceNotFoundException(MessageKeys.PRODUCT_NOT_FOUND + productId);
    }

}
