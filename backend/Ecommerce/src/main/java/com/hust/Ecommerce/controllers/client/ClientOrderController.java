package com.hust.Ecommerce.controllers.client;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hust.Ecommerce.constants.AppConstants;
import com.hust.Ecommerce.constants.FieldName;
import com.hust.Ecommerce.constants.MessageKeys;
import com.hust.Ecommerce.constants.ResourceName;
import com.hust.Ecommerce.dtos.ApiResponse;
import com.hust.Ecommerce.dtos.ListResponse;
import com.hust.Ecommerce.dtos.client.order.ClientConfirmedOrderResponse;
import com.hust.Ecommerce.dtos.client.order.ClientOrderDetailResponse;
import com.hust.Ecommerce.dtos.client.order.ClientSimpleOrderRequest;
import com.hust.Ecommerce.dtos.client.order.ClientSimpleOrderResponse;
import com.hust.Ecommerce.entities.authentication.User;
import com.hust.Ecommerce.entities.order.Order;
import com.hust.Ecommerce.exceptions.payload.ResourceNotFoundException;
import com.hust.Ecommerce.mappers.client.ClientOrderMapper;
import com.hust.Ecommerce.repositories.order.OrderRepository;
import com.hust.Ecommerce.services.authentication.IAuthenticationService;
import com.hust.Ecommerce.services.order.OrderService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/client-api/orders")
@AllArgsConstructor
public class ClientOrderController {

    private OrderRepository orderRepository;
    private IAuthenticationService authenticationService;
    private ClientOrderMapper clientOrderMapper;
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAllOrders(
            @RequestParam(name = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(name = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size,
            @RequestParam(name = "sort", defaultValue = AppConstants.DEFAULT_SORT) String sort,
            @RequestParam(name = "filter", required = false) @Nullable String filter) {
        Optional<User> optionalUser = authenticationService.getUserWithAuthorities();

        if (optionalUser.isEmpty())
            throw new ResourceNotFoundException(MessageKeys.USER_NOT_FOUND);
        User user = optionalUser.get();

        Page<Order> orders = orderRepository.findAllByEmail(user.getEmail(), sort, filter,
                PageRequest.of(page - 1, size));
        List<ClientSimpleOrderResponse> clientReviewResponses = orders.map(clientOrderMapper::entityToResponse)
                .toList();
        return ResponseEntity.ok(ApiResponse.<ListResponse<ClientSimpleOrderResponse>>builder().success(true)
                .payload(ListResponse.of(clientReviewResponses, orders)).build());
    }

    @GetMapping("/{code}")
    public ResponseEntity<ApiResponse<?>> getOrder(@PathVariable String code) {
        ClientOrderDetailResponse clientOrderDetailResponse = orderRepository.findByCode(code)
                .map(clientOrderMapper::entityToDetailResponse)
                .orElseThrow(() -> new ResourceNotFoundException(ResourceName.ORDER, FieldName.ORDER_CODE, code));
        return ResponseEntity.ok(ApiResponse.<ClientOrderDetailResponse>builder().success(true)
                .payload(clientOrderDetailResponse).build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<?>> createClientOrder(
            @RequestBody ClientSimpleOrderRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<ClientConfirmedOrderResponse>builder()
                .success(true).payload(orderService.createClientOrder(request)).build());
    }
}
