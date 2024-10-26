package com.hust.Ecommerce.web.rest.vm;

import com.hust.Ecommerce.constants.MessageKeys;
import com.hust.Ecommerce.services.dto.AdminUserDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class ManagedUserVM extends AdminUserDTO {
    public static final int PASSWORD_MIN_LENGTH = 4;

    public static final int PASSWORD_MAX_LENGTH = 100;

    @Size(min = PASSWORD_MIN_LENGTH, max = PASSWORD_MAX_LENGTH, message = MessageKeys.PASSWORD_REQUIRED)
    @NotBlank(message = MessageKeys.PASSWORD_REQUIRED)
    private String password;
}