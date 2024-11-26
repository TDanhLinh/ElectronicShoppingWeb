package com.hust.Ecommerce.dtos.client.order;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

import com.hust.Ecommerce.entities.payment.PaymentMethodType;

import lombok.Data;

@Data
public class ClientOrderDetailResponse {
    private Long orderId;
    private Instant orderCreatedAt;
    private String orderCode;
    private Integer orderStatus;
    private String orderToName;
    private String orderToPhone;
    private String orderToAddress;
    private BigDecimal orderTotalAmount;
    private BigDecimal orderTax;
    private BigDecimal orderShippingCost;
    private BigDecimal orderTotalPay;
    private PaymentMethodType orderPaymentMethodType;
    private Integer orderPaymentStatus;
    private List<ClientOrderVariantResponse> orderItems;

}
