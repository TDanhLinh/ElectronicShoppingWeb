package com.hust.Ecommerce.dtos.authentication;

import lombok.Data;

@Data
public class Role_UserRequest {
    private String permission;
    private String name;
}
