package com.hust.Ecommerce.dtos.payment;

import lombok.Data;

@Data
public class PaymentRequest {
    private String orderInfor;
    private Integer amount;
    private String bankCode;
}
