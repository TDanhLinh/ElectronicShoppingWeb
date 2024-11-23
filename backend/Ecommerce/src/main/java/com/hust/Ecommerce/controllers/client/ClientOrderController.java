package com.hust.Ecommerce.controllers.client;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hust.Ecommerce.dtos.client.order.ClientConfirmedOrderResponse;
import com.hust.Ecommerce.dtos.client.order.ClientSimpleOrderRequest;
import com.hust.Ecommerce.services.order.OrderService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/client-api/orders")
@AllArgsConstructor
public class ClientOrderController {

    private OrderService orderService;

}
