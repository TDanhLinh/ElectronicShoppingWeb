package com.hust.Ecommerce.mappers.client;

import org.springframework.stereotype.Component;

import com.hust.Ecommerce.dtos.client.ClientProductResponse;
import com.hust.Ecommerce.entities.Product;
import com.hust.Ecommerce.mappers.general.ImageMapper;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class ClientProductMapper {

    private ImageMapper imageMapper;
    private ClientCategoryMapper clientCategoryMapper;

    public ClientProductResponse entityToResponse(Product product,
            int averageRate,
            int countReviews) {
        ClientProductResponse clientProductResponse = new ClientProductResponse();

        clientProductResponse.setProductId(product.getId());
        clientProductResponse.setProductName(product.getName());
        clientProductResponse.setProductSlug(product.getSlug());
        clientProductResponse.setProductDescription(product.getDescription());
        clientProductResponse.setProductThumbnail(product.getThumbnail());
        clientProductResponse.setProductImages(imageMapper.entityToResponse(product.getImageList()));
        clientProductResponse.setProductCategory(clientCategoryMapper.entityToResponse(product.getCategory()));
        clientProductResponse.setProductBrand(product.getBrand());
        clientProductResponse.setProductStatus(product.getStatus());
        clientProductResponse.setWarrantyDuration(product.getWarrantyDuration());
        clientProductResponse.setProductAverageRate(averageRate);
        clientProductResponse.setProductCountReviews(countReviews);
        // clientProductResponse.setSimpleProductInventory(product.getInventory().)

        return clientProductResponse;
    }
}
