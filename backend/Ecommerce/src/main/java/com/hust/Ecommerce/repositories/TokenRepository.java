package com.hust.Ecommerce.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hust.Ecommerce.models.Token;
import com.hust.Ecommerce.models.User;

import java.util.Optional;
import java.util.List;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {
    Optional<Token> findByToken(String token);

    List<Token> findByUser(User user);

    Optional<Token> findByRefreshToken(String refreshToken);
}
