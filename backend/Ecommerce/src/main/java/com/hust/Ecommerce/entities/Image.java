package com.hust.Ecommerce.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.hust.Ecommerce.entities.enumeration.ImageType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "images")
public class Image extends BaseEntity {
    @Column(name = "name")
    private String name;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "type")
    private ImageType type;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

}
