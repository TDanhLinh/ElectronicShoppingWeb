package com.hust.Ecommerce.services.mail;

import com.hust.Ecommerce.entities.authentication.User;

public interface IMailService {
    public void sendActivationEmail(User user);

    public void sendCreationEmail(User user);

    public void sendPasswordResetMail(User user);
}