package com.hust.Ecommerce.dtos.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hust.Ecommerce.services.dto.AdminUserDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    @JsonProperty("token")
    private String token;

    @JsonProperty("refresh_token")
    private String refreshToken;

    private AdminUserDTO user;
}
