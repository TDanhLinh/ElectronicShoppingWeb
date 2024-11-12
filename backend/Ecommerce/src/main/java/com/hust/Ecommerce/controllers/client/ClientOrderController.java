package com.hust.Ecommerce.controllers.client;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/client-api/orders")
@AllArgsConstructor
public class ClientOrderController {

    // @PostMapping
    // public ResponseEntity<ClientConfirmedOrderResponse>
    // createClientOrder(@RequestBody ClientSimpleOrderRequest request) {
    // return
    // ResponseEntity.status(HttpStatus.CREATED).body(orderService.createClientOrder(request));
    // }
}
