package com.hust.Ecommerce.services.admin;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hust.Ecommerce.dtos.authentication.AdminUserDTO;
import com.hust.Ecommerce.entities.User;

public interface IManageUserService {
    public User createUser(AdminUserDTO userDTO);

    // public Optional<AdminUserDTO> updateUser(AdminUserDTO userDTO);

    public void deleteUser(Long id);

    public Page<User> findAllUsers(String keyword, Pageable pageable);
}
