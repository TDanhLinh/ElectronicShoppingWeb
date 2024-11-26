package com.hust.Ecommerce.controllers.payment;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    @GetMapping("/vn-pay/call-back")
    public void paymentCallback(@RequestParam Map<String, String> queryParams,
            HttpServletResponse response) {
        String vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
        String orderId = queryParams.get("orderId");
        String vnp_transactionNo = queryParams.get("vnp_TransactionNo");
        String vnp_tracsactionStatus = queryParams.get("vnp_tracsactionStatus");

        if (vnp_ResponseCode.equals("00")) {
            try {
                // thanh cong , cap nhat order,

                // redirect frontend thong bao thanh cong
                response.sendRedirect("http://localhost:3000/order/success");

            } catch (Exception e) {
                // TODO: handle exception
            }

        } else {
            try {
                // that bai, cap nat order
                response.sendRedirect("http://localhost:3000/order/failure");
            } catch (Exception e) {
                // TODO: handle exception
            }
        }
    }

}
