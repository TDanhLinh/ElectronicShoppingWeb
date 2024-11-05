package com.hust.Ecommerce.services.authentication;

import com.hust.Ecommerce.entities.Token;
import com.hust.Ecommerce.entities.User;

public interface IVerificationTokenService {
    public Token addTokenEndRefreshToken(User user, String token);

    public Token verifyRefreshToken(String refreshToken);

    public void deleteTokenWithToken(Token token);

    public void deleteTokenWithJwt(String jwt);

}
