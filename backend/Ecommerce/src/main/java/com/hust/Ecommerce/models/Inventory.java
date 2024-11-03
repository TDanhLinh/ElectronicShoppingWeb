package com.hust.Ecommerce.models;

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
@Table(name = "inventories")
public class Inventory extends BaseEntity<Long> {
    @Column(name = "amount")
    private Integer amount;

    @Column(name = "available")
    private Integer available;

    @Column(name = "sold")
    private Integer sold;

    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
