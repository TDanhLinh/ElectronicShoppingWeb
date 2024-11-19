package com.hust.Ecommerce.dtos.client.order;

import com.hust.Ecommerce.entities.payment.PaymentMethodType;

import lombok.Data;

@Data
public class ClientSimpleOrderRequest {
    private PaymentMethodType paymentMethodType;
    private ShippingInfo shippingInfo;
    private String ipAdress;

    @Data
    public static class ShippingInfo {
        private String name;
        private String phone;
        private String address;
    }
}
