package com.hust.Ecommerce.services.order;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hust.Ecommerce.constants.AppConstants;

import com.hust.Ecommerce.constants.MessageKeys;

import com.hust.Ecommerce.dtos.client.order.ClientConfirmedOrderResponse;
import com.hust.Ecommerce.dtos.client.order.ClientSimpleOrderRequest;
import com.hust.Ecommerce.dtos.payment.PaymentRequest;
import com.hust.Ecommerce.dtos.payment.PaymentResponse;
import com.hust.Ecommerce.entities.authentication.User;
import com.hust.Ecommerce.entities.cart.Cart;
import com.hust.Ecommerce.entities.cart.CartVariant;
import com.hust.Ecommerce.entities.order.Order;
import com.hust.Ecommerce.entities.order.OrderVariant;
import com.hust.Ecommerce.entities.payment.PaymentMethodType;
import com.hust.Ecommerce.exceptions.payload.ResourceNotFoundException;
import com.hust.Ecommerce.repositories.cart.CartRepository;
import com.hust.Ecommerce.repositories.order.OrderRepository;
import com.hust.Ecommerce.services.authentication.IAuthenticationService;
import com.hust.Ecommerce.services.payment.PaymentService;
import com.hust.Ecommerce.util.RandomUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class OrderServiceImpl implements OrderService {

    private final IAuthenticationService authenticationService;
    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;
    private final PaymentService vnPayService;

    @Override
    public ClientConfirmedOrderResponse createClientOrder(ClientSimpleOrderRequest request) {
        Optional<User> optionalUser = authenticationService.getUserWithAuthorities();

        if (optionalUser.isEmpty())
            throw new ResourceNotFoundException(MessageKeys.USER_NOT_FOUND);

        User user = optionalUser.get();

        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException(MessageKeys.CART_NOT_FOUND));

        // (1) Tạo đơn hàng
        Order order = new Order();

        order.setCode(RandomUtil.generateOrderCode());
        order.setStatus(1); // Status 1: Đơn hàng mới
        order.setToName(request.getShippingInfo().getName());
        order.setToPhone(request.getShippingInfo().getPhone());
        order.setToAddress(request.getShippingInfo().getAddress());
        order.setNote(request.getNote());
        order.setUser(user);

        order.setOrderVariants(cart.getCartVariants().stream()
                .map((CartVariant cartVariant) -> {
                    // xu ly promotion neu co
                    Double currentPrice = cartVariant.getVariant().getPrice();
                    return new OrderVariant()
                            .setOrder(order)
                            .setVariant(cartVariant.getVariant())
                            .setPrice(BigDecimal.valueOf(currentPrice))
                            .setQuantity(cartVariant.getQuantity())
                            .setAmount(BigDecimal.valueOf(currentPrice)
                                    .multiply(BigDecimal.valueOf(cartVariant.getQuantity())));
                })
                .collect(Collectors.toList()));

        // Calculate price values
        // TODO: Vấn đề khuyến mãi
        BigDecimal totalAmount = BigDecimal.valueOf(order.getOrderVariants().stream()
                .mapToDouble(orderVariant -> orderVariant.getAmount().doubleValue())
                .sum());

        BigDecimal tax = BigDecimal.valueOf(AppConstants.DEFAULT_TAX);

        BigDecimal shippingCost = BigDecimal.ZERO;

        BigDecimal totalPay = totalAmount
                .add(totalAmount.multiply(tax).setScale(0, RoundingMode.HALF_UP))
                .add(shippingCost);

        order.setTotalAmount(totalAmount);
        order.setTax(tax);
        order.setShippingCost(shippingCost);
        order.setTotalPay(totalPay);
        order.setPaymentMethodType(request.getPaymentMethodType());
        order.setPaymentStatus(0); // Status 0: Chưa thanh toán

        // (2) Tạo response
        ClientConfirmedOrderResponse response = new ClientConfirmedOrderResponse();

        response.setOrderCode(order.getCode());
        response.setOrderPaymentMethodType(order.getPaymentMethodType());

        // (3) Kiểm tra hình thức thanh toán
        if (request.getPaymentMethodType() == PaymentMethodType.CASH) {
            orderRepository.save(order);
        } else if (request.getPaymentMethodType() == PaymentMethodType.VNPAY) {
            try {

                // (3.2.2) Tạo một yêu cầu giao dịch vnpay
                PaymentRequest vnpRequest = new PaymentRequest();

                // vnpRequest.setAmount(order.getTotalPay().longValue());
                vnpRequest.setAmount(500000L);
                vnpRequest.setTxnRef(order.getCode());
                vnpRequest.setIpAddress(request.getIpAdress());
                vnpRequest.setUserId(user.getId());

                PaymentResponse vnpResponse = vnPayService.init(vnpRequest);

                // (3.2.3) Lưu order
                order.setVnPayOrderId(vnpResponse.getId());

                log.debug("tao order {}", order);
                orderRepository.save(order);

                // (3.2.4) Trả về đường dẫn checkout cho user
                response.setOrderVnpayCheckoutLink(vnpResponse.getVnpUrl());
            } catch (Exception e) {
                throw new RuntimeException("Cannot create vnPay transaction request!" + e);
            }
        } else {
            throw new RuntimeException("Cannot identify payment method");
        }

        // thanh toan thanh cong moi vo hieu hoa cart
        // (4) Vô hiệu cart
        // cart.setStatus(2); // Status 2: Vô hiệu lực
        // cartRepository.save(cart);

        return response;
    }

}
