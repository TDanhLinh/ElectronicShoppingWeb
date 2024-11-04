package com.hust.Ecommerce.services.maper;

import org.mapstruct.Mapper;

import com.hust.Ecommerce.dtos.product.ProductDTO;
import com.hust.Ecommerce.models.Product;

import lombok.RequiredArgsConstructor;

@Mapper(componentModel = "spring")
@RequiredArgsConstructor
public abstract class ProductMapper {

    public abstract Product toProduct(ProductDTO productDTO);

}
