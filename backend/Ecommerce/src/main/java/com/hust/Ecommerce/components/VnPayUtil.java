package com.hust.Ecommerce.components;

import java.util.Map;

import org.springframework.stereotype.Component;

import com.hust.Ecommerce.configuration.VnPayConfiguration;

import com.hust.Ecommerce.util.VnPayUtils;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@AllArgsConstructor
@Slf4j
public class VnPayUtil {
    private final VnPayConfiguration vnPayConfig;

    public String createVnPayPayment(HttpServletRequest request) {
        long amount = Integer.parseInt(request.getParameter("amount")) * 100L;
        String bankCode = request.getParameter("bankCode");
        // String orderId = request.getParameter("orderId");

        Map<String, String> vnpParamsMap = vnPayConfig.getVNPayConfig();
        vnpParamsMap.put("vnp_Amount", String.valueOf(amount));
        // vnpParamsMap.put("vnp_orderId", String.valueOf(orderId));
        if (bankCode != null && !bankCode.isEmpty()) {
            vnpParamsMap.put("vnp_BankCode", bankCode);
        }
        vnpParamsMap.put("vnp_IpAddr", VnPayUtils.getIpAddress(request));
        // build query url
        String queryUrl = VnPayUtils.getPaymentURL(vnpParamsMap, true);
        String hashData = VnPayUtils.getPaymentURL(vnpParamsMap, false);
        String vnpSecureHash = VnPayUtils.hmacSHA512(vnPayConfig.getSecretKey(), hashData);
        queryUrl += "&vnp_SecureHash=" + vnpSecureHash;
        return vnPayConfig.getVnp_PayUrl() + "?" + queryUrl;

    }
}
