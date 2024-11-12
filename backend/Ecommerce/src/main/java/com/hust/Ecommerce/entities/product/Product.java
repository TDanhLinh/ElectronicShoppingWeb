package com.hust.Ecommerce.entities.product;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.hust.Ecommerce.entities.BaseEntity;
import com.hust.Ecommerce.entities.cart.Cart;
import com.hust.Ecommerce.entities.general.Image;
import com.hust.Ecommerce.entities.order.OrderVariant;
import com.hust.Ecommerce.entities.review.Review;
import com.hust.Ecommerce.util.JsonNodeConverter;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import lombok.Getter;

import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "products")
public class Product extends BaseEntity {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "slug", nullable = false, unique = true)
    private String slug;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "thumbnail")
    private String thumbnail;

    @Column(name = "status")
    private String status;

    @Column(name = "warranty_duration")
    private Long warrantyDuration;

    @Column(name = "weight")
    private Double weight;

    @Column(name = "unit")
    private String unit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id")
    private Brand brand;

    @Column(name = "model")
    private String model;

    @Column(name = "specifications", columnDefinition = "JSON")
    @Convert(converter = JsonNodeConverter.class)
    private JsonNode specifications;

    @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(name = "product_category", joinColumns = @JoinColumn(name = "product_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
    private List<Category> categories = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "product", orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Image> images = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "product", orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Variant> variants = new ArrayList<>();
    // @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, optional = true)
    // @JoinColumn(name = "inventory_id", referencedColumnName = "id")
    // private Count inventory;

}
