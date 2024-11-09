package com.hust.Ecommerce.entities.order;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.hust.Ecommerce.entities.BaseEntity;
import com.hust.Ecommerce.entities.authentication.User;
import com.hust.Ecommerce.entities.enumeration.OrderState;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "orders")
public class Order extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "state")
    @Enumerated(EnumType.STRING)
    private OrderState state;

    @Column(name = "order_date")
    private Instant orderDate;

    @Column(name = "total_money")
    private Double totalMoney;

    @Column(name = "note", length = 100)
    private String note;

    @Column(name = "payment_state")
    private String paymentState;

    @Column(name = "payment_method")
    private String paymentMethod;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order", orphanRemoval = true)
    @JsonManagedReference
    private List<OrderDetail> orderDetailList = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "shipping_infors_id")
    private ShippingInfor shippingInfor;

}
