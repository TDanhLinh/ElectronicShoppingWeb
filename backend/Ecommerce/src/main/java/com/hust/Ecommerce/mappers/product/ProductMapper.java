package com.hust.Ecommerce.mappers.product;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

import com.hust.Ecommerce.dtos.product.ProductRequest;
import com.hust.Ecommerce.dtos.product.ProductResponse;
import com.hust.Ecommerce.entities.Product;
import com.hust.Ecommerce.mappers.GenericMapper;
import com.hust.Ecommerce.mappers.general.ImageMapper;
import com.hust.Ecommerce.mappers.inventory.InventoryMapper;
import com.hust.Ecommerce.util.MapperUtils;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = { MapperUtils.class,
        ImageMapper.class, BrandMapper.class, CategoryMapper.class, InventoryMapper.class })
public interface ProductMapper extends GenericMapper<Product, ProductRequest, ProductResponse> {

    @Override
    @BeanMapping(qualifiedByName = "attachProduct")
    @Mapping(source = "categoryIds", target = "categoryList")
    @Mapping(source = "brandId", target = "brand")
    @Mapping(source = "images", target = "imageList")
    @Mapping(source = "inventory", target = "inventory")
    Product requestToEntity(ProductRequest request);

    @Override
    @BeanMapping(qualifiedByName = "attachProduct")
    @Mapping(source = "categoryIds", target = "categoryList")
    @Mapping(source = "brandId", target = "brand")
    @Mapping(source = "images", target = "imageList")
    @Mapping(source = "inventory", target = "inventory")
    Product partialUpdate(@MappingTarget Product entity, ProductRequest request);

    @Override
    @Mapping(source = "imageList", target = "images")
    @Mapping(source = "categoryList", target = "categories")
    @Mapping(source = "brand", target = "brandProduct")
    @Mapping(source = "inventory", target = "inventory")
    ProductResponse entityToResponse(Product product);

}
