package com.hust.Ecommerce.models;

import java.util.ArrayList;
import java.util.List;

import com.hust.Ecommerce.models.enumeration.OrderState;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order", orphanRemoval = true)
    private List<OrderItem> orderItemList = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "shipping_infors_id")
    private ShippingInfor shippingInfor;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Order)) {
            return false;
        }
        return getId() != null && getId().equals(((Order) o).getId());
    }

    @Override
    public int hashCode() {
        // see
        // https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "Order [user=" + user + ", state=" + state + ", totalPrice=" + totalPrice + ", paymentState="
                + paymentState + ", paymentMethod=" + paymentMethod + ", orderItemList=" + orderItemList
                + ", shippingInfor=" + shippingInfor + "]";
    }

}
