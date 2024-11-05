package com.hust.Ecommerce.mappers.client;

import org.springframework.stereotype.Component;

import com.hust.Ecommerce.mappers.general.ImageMapper;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class ClientProductMapper {

    private ImageMapper imageMapper;
    private ClientCategoryMapper clientCategoryMapper;

}
