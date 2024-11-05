package com.hust.Ecommerce.services.client.account;

import java.time.Instant;
import java.util.Optional;

import com.hust.Ecommerce.entities.User;
import com.hust.Ecommerce.entities.enumeration.Gender;

public interface IUserSetting {
    public void updatePersonalSetting(String name, Gender gender, String phoneNumber, String address, String imageUrl,
            Instant datOfBirth);

    public void changePassword(String currentPassword, String newPassword);

    public Optional<User> getUserWithAuthorities();

    public Optional<User> getUserWithAuthoritiesByEmail(String email);
}
