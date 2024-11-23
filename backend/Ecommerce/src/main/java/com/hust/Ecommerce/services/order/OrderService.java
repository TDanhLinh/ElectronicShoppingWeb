package com.hust.Ecommerce.services.order;

import com.hust.Ecommerce.dtos.client.order.ClientConfirmedOrderResponse;
import com.hust.Ecommerce.dtos.client.order.ClientSimpleOrderRequest;

public interface OrderService {
    ClientConfirmedOrderResponse createClientOrder(ClientSimpleOrderRequest request);
}
