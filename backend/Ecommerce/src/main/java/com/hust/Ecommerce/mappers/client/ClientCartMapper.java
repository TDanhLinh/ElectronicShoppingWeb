package com.hust.Ecommerce.mappers.client;

import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.hust.Ecommerce.dtos.client.ClientCartResponse;
import com.hust.Ecommerce.dtos.client.ClientCartVariantResponse;
import com.hust.Ecommerce.entities.cart.Cart;
import com.hust.Ecommerce.entities.cart.CartVariant;
import com.hust.Ecommerce.entities.general.Image;
import com.hust.Ecommerce.entities.product.Product;
import com.hust.Ecommerce.entities.product.Variant;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class ClientCartMapper {

    public ClientCartResponse entityToResponse(Cart entity) {
        var response = new ClientCartResponse();
        response.setCartId(entity.getId());

        response.setCartItems(entity.getCartVariants().stream()
                .sorted(Comparator.comparing(CartVariant::getCreatedAt))
                .map(this::entityToResponse)
                .collect(Collectors.toList()));
        return response;
    }

    private ClientCartVariantResponse.ClientVariantResponse.ClientProductResponse entityToResponse(Product entity) {
        var response = new ClientCartVariantResponse.ClientVariantResponse.ClientProductResponse();
        response.setProductId(entity.getId());
        response.setProductName(entity.getName());
        response.setProductSlug(entity.getSlug());
        response.setProductThumbnail(entity.getThumbnail());
        return response;
    }

    private ClientCartVariantResponse.ClientVariantResponse entityToResponse(Variant entity) {
        var response = new ClientCartVariantResponse.ClientVariantResponse();
        response.setVariantId(entity.getId());
        response.setVariantProduct(entityToResponse(entity.getProduct()));
        response.setVariantPrice(entity.getPrice());
        response.setVariantProperties(entity.getProperties());
        // xu ly inventory clientvariantresponse
        return response;
    }

    private ClientCartVariantResponse entityToResponse(CartVariant entity) {
        var response = new ClientCartVariantResponse();
        response.setCartItemVariant(entityToResponse(entity.getVariant()));
        response.setCartItemQuantity(entity.getQuantity());
        return response;
    }
}
