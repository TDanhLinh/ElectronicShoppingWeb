package com.hust.Ecommerce.services;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.hibernate.validator.constraints.UUID;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hust.Ecommerce.constants.MessageKeys;
import com.hust.Ecommerce.exceptions.payload.DataNotFoundException;
import com.hust.Ecommerce.models.Token;
import com.hust.Ecommerce.models.User;
import com.hust.Ecommerce.repositories.TokenRepository;
import com.hust.Ecommerce.util.RandomUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TokenService {
    private final TokenRepository tokenRepository;

    // số thiết bị nhập
    private static final int MAX_TOKENS = 3;

    @Value("${jwt.expiration-token}")
    private int expirationToken;

    @Value("${jwt.expiration-refresh-token}")
    private int expirationRefreshToken;

    // kiem tra so luong thiet bi dang nhap cung 1 account, tao token , save token
    @Transactional
    public Token addTokenEndRefreshToken(User user, String token) {
        List<Token> userTokens = tokenRepository.findByUser(user);

        int tokensCount = userTokens.size();

        // số lượng token vượt quá giới hạn
        if (tokensCount >= MAX_TOKENS) {
            Token tokenToDelete;
            // chúng ta sẽ xoá token đầu tiên trong danh sách
            tokenToDelete = userTokens.get(0);

            tokenRepository.delete(tokenToDelete);
        }

        Token newToken = Token.builder()
                .user(user)
                .token(token)
                .refreshToken(RandomUtil.generateRefreshToken())
                .tokenType("Bearer")
                .expirationTime(Instant.now().plusMillis(expirationToken))
                .refreshExpirationTime(Instant.now().plusMillis(expirationRefreshToken))
                .revoked(false)
                .expired(false)
                .build();

        return tokenRepository.save(newToken);
    }

    public Token verifyRefreshToken(String refreshToken) {
        Token token = tokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new DataNotFoundException(MessageKeys.NOT_FOUND));

        if (token.getRefreshExpirationTime().compareTo(Instant.now()) < 0) {
            tokenRepository.delete(token);
            throw new RuntimeException("Refresh token expired");
        }

        return token;
    }

    public void deleteTokenWithToken(Token token) {
        tokenRepository.delete(token);
    }
}
