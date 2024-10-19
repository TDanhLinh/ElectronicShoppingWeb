package com.hust.Ecommerce.services;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hust.Ecommerce.components.JwtTokenUtil;
import com.hust.Ecommerce.constants.MessageKeys;
import com.hust.Ecommerce.constants.RoleKeys;
import com.hust.Ecommerce.exceptions.payload.DataNotFoundException;
import com.hust.Ecommerce.exceptions.payload.EmailAlreadyUsedException;
import com.hust.Ecommerce.models.Role;
import com.hust.Ecommerce.models.User;
import com.hust.Ecommerce.repositories.RoleRepository;
import com.hust.Ecommerce.repositories.UserRepository;
import com.hust.Ecommerce.services.dto.AdminUserDTO;
import com.hust.Ecommerce.util.RandomUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public User registerUser(AdminUserDTO userDTO, String password) {
        userRepository
                .findByEmail(userDTO.getEmail())
                .ifPresent(existingUser -> {
                    boolean removed = removeNonActivatedUser(existingUser);
                    if (!removed) {
                        throw new EmailAlreadyUsedException(MessageKeys.USER_EXISTED);
                    }
                });

        User newUser = new User();
        String encryptedPassword = passwordEncoder.encode(password);
        newUser.setEmail(userDTO.getEmail());
        // new user gets initially a generated password
        newUser.setPassword(encryptedPassword);

        if (userDTO.getFullName() != null) {
            newUser.setFullName(userDTO.getFullName());
        }

        // config image url
        if (userDTO.getImageUrl() != null) {
            newUser.setImageUrl(userDTO.getImageUrl());
        }

        // new user is not active
        newUser.setActivated(false);

        // new user gets registration key
        newUser.setActivationKey(RandomUtil.generateActivationKey());
        Set<Role> roles = new HashSet<>();
        roleRepository.findById(RoleKeys.USER).ifPresent(roles::add);
        newUser.setRoles(roles);

        userRepository.save(newUser);

        log.debug("Created Information for User: {}", newUser);
        return newUser;
    }

    public Optional<User> activateRegistration(String key) {
        log.debug("Activating user for activation key {}", key);
        return userRepository
                .findByActivationKey(key)
                .map(user -> {
                    // activate given user for the registration key.
                    user.setActivated(true);
                    user.setActivationKey(null);
                    log.debug("Activated user: {}", user);
                    return user;
                });
    }

    private boolean removeNonActivatedUser(User existingUser) {
        if (existingUser.isActivated()) {
            return false;
        }
        userRepository.delete(existingUser);
        userRepository.flush();
        return true;
    }

    public String login(String email, String password) {
        // // exists by user
        // Optional<User> optionalUser = userRepository.findByEmail(email);
        // if (optionalUser.isEmpty()) {
        // throw new DataNotFoundException(
        // MessageKeys.EMAIL_AND_PASSWORD_FAILED
        // );
        // }
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email,
                password);
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return jwtTokenUtil.createToken(authentication);
    }
}