package com.hust.Ecommerce.services.client.account;

import java.time.Instant;
import java.util.Optional;

import com.hust.Ecommerce.entities.authentication.GenderEnum;
import com.hust.Ecommerce.entities.authentication.User;

public interface IUserSetting {
    public void updatePersonalSetting(String name, GenderEnum gender, String phoneNumber, String address,
            String imageUrl,
            Instant datOfBirth);

    public void changePassword(String currentPassword, String newPassword);

    public Optional<User> getUserWithAuthorities();

    public Optional<User> getUserWithAuthoritiesByEmail(String email);
}
