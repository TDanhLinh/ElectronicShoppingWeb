package com.hust.Ecommerce.constants;

import java.util.List;

public interface SearchFields {
        List<String> USER = List.of(
                        "email",
                        "name",
                        "phoneNumber",
                        "address");

        List<String> ROLE = List.of(
                        "name",
                        "permission");

        List<String> CATEGORY = List.of(
                        "name",
                        "slug",
                        "description");

        List<String> REVIEW = List.of(
                        "user.name",
                        "user.email",
                        "product.name",
                        "product.slug",
                        "content");

        List<String> CLIENT_PRODUCT = List.of(
                        "name",
                        "slug",
                        "category.name",
                        "brand");

        List<String> INVENTORY = List.of(
                        "amount",
                        "available",
                        "sold",
                        "product.name",
                        "product.category",
                        "product.brand");
        List<String> BRAND = List.of(
                        "name",
                        "description");

        List<String> PRODUCT = List.of(
                        "name",
                        "slug",
                        "description",
                        // "categoryList.name",
                        "brand.name",
                        "unit",
                        "model",
                        "status",
                        "price"

        );
}
