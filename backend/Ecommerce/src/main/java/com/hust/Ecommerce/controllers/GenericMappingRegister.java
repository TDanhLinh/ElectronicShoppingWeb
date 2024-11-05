package com.hust.Ecommerce.controllers;

import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import org.springframework.web.util.pattern.PathPatternParser;

import com.fasterxml.jackson.databind.JsonNode;
import com.hust.Ecommerce.constants.ResourceName;
import com.hust.Ecommerce.constants.SearchFields;
import com.hust.Ecommerce.dtos.authentication.UserRequest;
import com.hust.Ecommerce.dtos.authentication.UserResponse;
import com.hust.Ecommerce.dtos.product.BrandRequest;
import com.hust.Ecommerce.dtos.product.BrandResponse;
import com.hust.Ecommerce.dtos.product.CategoryRequest;
import com.hust.Ecommerce.dtos.product.CategoryResponse;
import com.hust.Ecommerce.dtos.product.ProductRequest;
import com.hust.Ecommerce.dtos.product.ProductResponse;
import com.hust.Ecommerce.entities.Brand;
import com.hust.Ecommerce.entities.Category;
import com.hust.Ecommerce.entities.Product;
import com.hust.Ecommerce.entities.User;
import com.hust.Ecommerce.mappers.authentication.UserMapper;
import com.hust.Ecommerce.mappers.product.BrandMapper;
import com.hust.Ecommerce.mappers.product.CategoryMapper;
import com.hust.Ecommerce.mappers.product.ProductMapper;
import com.hust.Ecommerce.repositories.authentication.UserRepository;
import com.hust.Ecommerce.repositories.product.BrandRepository;
import com.hust.Ecommerce.repositories.product.CategoryRepository;
import com.hust.Ecommerce.repositories.product.ProductRepository;
import com.hust.Ecommerce.services.CrudService;
import com.hust.Ecommerce.services.GenericService;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class GenericMappingRegister {

        private final ApplicationContext context;
        private final RequestMappingHandlerMapping handlerMapping;

        // ham tao api
        private <I, O> void register(String resource,
                        GenericController<I, O> controller,
                        CrudService<Long, I, O> service,
                        Class<I> requestType) throws NoSuchMethodException {
                RequestMappingInfo.BuilderConfiguration options = new RequestMappingInfo.BuilderConfiguration();
                options.setPatternParser(new PathPatternParser());

                controller.setCrudService(service);
                controller.setRequestType(requestType);

                handlerMapping.registerMapping(
                                RequestMappingInfo.paths("/api" + resource)
                                                .methods(RequestMethod.GET)
                                                .produces(MediaType.APPLICATION_JSON_VALUE)
                                                .options(options)
                                                .build(),
                                controller,
                                controller.getClass().getMethod("getAllResources", int.class, int.class,
                                                String.class, String.class, String.class, boolean.class));

                handlerMapping.registerMapping(
                                RequestMappingInfo.paths("/api" + resource + "/{id}")
                                                .methods(RequestMethod.GET)
                                                .produces(MediaType.APPLICATION_JSON_VALUE)
                                                .options(options)
                                                .build(),
                                controller,
                                controller.getClass().getMethod("getResource", Long.class));

                handlerMapping.registerMapping(
                                RequestMappingInfo.paths("/api" + resource)
                                                .methods(RequestMethod.POST)
                                                .consumes(MediaType.APPLICATION_JSON_VALUE)
                                                .produces(MediaType.APPLICATION_JSON_VALUE)
                                                .options(options)
                                                .build(),
                                controller,
                                controller.getClass().getMethod("createResource", JsonNode.class));

                handlerMapping.registerMapping(
                                RequestMappingInfo.paths("/api" + resource + "/{id}")
                                                .methods(RequestMethod.PUT)
                                                .consumes(MediaType.APPLICATION_JSON_VALUE)
                                                .produces(MediaType.APPLICATION_JSON_VALUE)
                                                .options(options)
                                                .build(),
                                controller,
                                controller.getClass().getMethod("updateResource", Long.class, JsonNode.class));

                handlerMapping.registerMapping(
                                RequestMappingInfo.paths("/api" + resource + "/{id}")
                                                .methods(RequestMethod.DELETE)
                                                .options(options)
                                                .build(),
                                controller,
                                controller.getClass().getMethod("deleteResource", Long.class));

                handlerMapping.registerMapping(
                                RequestMappingInfo.paths("/api" + resource)
                                                .methods(RequestMethod.DELETE)
                                                .consumes(MediaType.APPLICATION_JSON_VALUE)
                                                .options(options)
                                                .build(),
                                controller,
                                controller.getClass().getMethod("deleteResources", List.class));
        }

        // controllers
        private GenericController<UserRequest, UserResponse> userController;
        private GenericController<CategoryRequest, CategoryResponse> categoryController;
        private GenericController<ProductRequest, ProductResponse> productController;
        private GenericController<BrandRequest, BrandResponse> brandController;
        // services
        private GenericService<User, UserRequest, UserResponse> userService;
        private GenericService<Category, CategoryRequest, CategoryResponse> categoryService;
        private GenericService<Product, ProductRequest, ProductResponse> productService;
        private GenericService<Brand, BrandRequest, BrandResponse> brandService;

        @PostConstruct
        public void registerControllers() throws NoSuchMethodException {
                register("/users", userController, userService.init(
                                context.getBean(UserRepository.class),
                                context.getBean(UserMapper.class),
                                SearchFields.USER,
                                ResourceName.USER), UserRequest.class);

                register("/categories", categoryController, categoryService.init(
                                context.getBean(CategoryRepository.class),
                                context.getBean(CategoryMapper.class),
                                SearchFields.CATEGORY,
                                ResourceName.CATEGORY), CategoryRequest.class);

                register("/brands", brandController, brandService.init(
                                context.getBean(BrandRepository.class),
                                context.getBean(BrandMapper.class),
                                SearchFields.BRAND,
                                ResourceName.BRAND), BrandRequest.class);

                register("/products", productController, productService.init(
                                context.getBean(ProductRepository.class),
                                context.getBean(ProductMapper.class),
                                SearchFields.PRODUCT,
                                ResourceName.PRODUCT), ProductRequest.class);
        }

}
