package com.hust.Ecommerce.models;

import com.hust.Ecommerce.models.enumeration.OrderState;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "orders")
public class Order extends BaseEntity<Long> {
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "state")
    private OrderState state;

    @Column(name = "total_price")
    private Double totalPrice;

    @Column(name = "payment_state")
    private String paymentState;

    @Column(name = "payment_method")
    private String paymentMethod;

    @OneToOne
    @JoinColumn(name = "shipping_infors_id")
    private ShippingInfor shippingInfor;
}
