package com.hust.Ecommerce.services;

import com.hust.Ecommerce.dtos.product.ProductDTO;
import com.hust.Ecommerce.models.Product;

public interface IProductService {
    Product createProduct(ProductDTO productDTO) throws Exception;

    Product getProductById(Long id) throws Exception;

    // Page<ProductResponse> getAllProducts(String keyword,
    // Long categoryId,
    // PageRequest pageRequest,
    // String sortField,
    // String sortDirection);

    Product updateProduct(Long id, ProductDTO productDTO) throws Exception;

    void deleteProduct(Long id);

    boolean existsProduct(String name);

    Product getDetailProducts(long productId) throws Exception;

    // List<Product> findProductsByIds(List<Long> productIds);
}
