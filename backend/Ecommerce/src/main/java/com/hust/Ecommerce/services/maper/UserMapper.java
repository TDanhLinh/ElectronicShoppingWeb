package com.hust.Ecommerce.services.maper;

import org.springframework.stereotype.Service;

import com.hust.Ecommerce.models.User;
import com.hust.Ecommerce.services.dto.AdminUserDTO;

@Service
public class UserMapper {
    public AdminUserDTO userToAdminUserDTO(User user) {
        return new AdminUserDTO(user);
    }
}
