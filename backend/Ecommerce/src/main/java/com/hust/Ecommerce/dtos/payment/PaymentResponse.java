package com.hust.Ecommerce.dtos.payment;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentResponse {
    public boolean success;

    public String paymentUrl;
}
