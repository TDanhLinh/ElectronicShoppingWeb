package com.hust.Ecommerce.models;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import lombok.Getter;

import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "products")
public class Product extends BaseEntity<Long> {

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "thumbnail")
    private String thumbnail;

    private List<String> imageUrls = new ArrayList<>();

    @Column(name = "price")
    private Double price;

    @Column(name = "status")
    private String status;

    @Column(name = "warranty_duration")
    private Long warrantyDuration;

    @Column(name = "brand")
    private String brand;

    @OneToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "model")
    private String model;
}
