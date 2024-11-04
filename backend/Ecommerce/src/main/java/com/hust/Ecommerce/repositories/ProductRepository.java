package com.hust.Ecommerce.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hust.Ecommerce.models.Product;
import com.hust.Ecommerce.util.ConfixSql;

public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsByName(String name);

    @Query(ConfixSql.Product.GET_DETAIL_PRODUCT)
    Optional<Product> getDetailProducts(@Param("productId") Long productId);
}
