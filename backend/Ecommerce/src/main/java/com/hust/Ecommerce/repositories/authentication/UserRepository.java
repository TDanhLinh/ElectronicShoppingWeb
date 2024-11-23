package com.hust.Ecommerce.repositories.authentication;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.hust.Ecommerce.entities.authentication.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    Optional<User> findByEmail(String email);

    Optional<User> findByActivationKey(String activationKey);

    Optional<User> findOneByResetKey(String resetKey);

}
