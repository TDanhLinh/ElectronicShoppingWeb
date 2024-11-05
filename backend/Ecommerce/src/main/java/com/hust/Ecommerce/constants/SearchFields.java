package com.hust.Ecommerce.constants;

import java.util.List;

public interface SearchFields {
    List<String> USER = List.of(
            "email",
            "name",
            "phonenumber",
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

}
