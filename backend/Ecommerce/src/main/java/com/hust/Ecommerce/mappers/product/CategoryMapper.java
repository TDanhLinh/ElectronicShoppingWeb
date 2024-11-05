package com.hust.Ecommerce.mappers.product;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import com.hust.Ecommerce.dtos.product.CategoryRequest;
import com.hust.Ecommerce.dtos.product.CategoryResponse;
import com.hust.Ecommerce.entities.Category;
import com.hust.Ecommerce.mappers.GenericMapper;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CategoryMapper extends GenericMapper<Category, CategoryRequest, CategoryResponse> {

}
