package com.hust.Ecommerce.dtos.requests;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ForgotPasswordDTO {

    private String password;

    @JsonProperty("new_password")
    private String newPassword;
}
