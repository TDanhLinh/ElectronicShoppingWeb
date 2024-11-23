package com.hust.Ecommerce.dtos.client.order;

import org.springframework.lang.Nullable;

import com.hust.Ecommerce.entities.payment.PaymentMethodType;

import lombok.Data;

@Data
public class ClientConfirmedOrderResponse {
    private String orderCode;
    private PaymentMethodType orderPaymentMethodType;
    @Nullable
    private String orderVnpayCheckoutLink;
}
