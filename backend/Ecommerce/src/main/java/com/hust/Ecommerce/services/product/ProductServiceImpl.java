package com.hust.Ecommerce.services.product;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hust.Ecommerce.constants.ResourceName;
import com.hust.Ecommerce.constants.SearchFields;
import com.hust.Ecommerce.dtos.ListResponse;
import com.hust.Ecommerce.dtos.product.ProductRequest;
import com.hust.Ecommerce.dtos.product.ProductResponse;
import com.hust.Ecommerce.mappers.product.ProductMapper;
import com.hust.Ecommerce.repositories.product.ProductRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {

    private ProductMapper productMapper;
    private ProductRepository productRepository;

    @Override
    public ListResponse<ProductResponse> findAll(int page, int size, String sort, String filter, String search,
            boolean all) {
        return defaultFindAll(page, size, sort, filter, search, all, SearchFields.PRODUCT, productRepository,
                productMapper);
    }

    @Override
    public ProductResponse findById(Long id) {
        return defaultFindById(id, productRepository, productMapper, ResourceName.PRODUCT);
    }

    @Override
    public ProductResponse save(ProductRequest request) {
        return defaultSave(request, productRepository, productMapper);
    }

    @Override
    public ProductResponse save(Long id, ProductRequest request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'save'");
    }

    @Override
    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public void delete(List<Long> ids) {
        productRepository.deleteAllById(ids);
    }
}
