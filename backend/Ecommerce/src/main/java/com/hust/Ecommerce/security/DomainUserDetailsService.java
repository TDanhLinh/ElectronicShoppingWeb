package com.hust.Ecommerce.security;

import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.hust.Ecommerce.exceptions.payload.UserNotActivatedException;
import com.hust.Ecommerce.models.Role;
import com.hust.Ecommerce.models.User;
import com.hust.Ecommerce.repositories.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component("userDetailsService")
@RequiredArgsConstructor
@Slf4j
public class DomainUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(final String email) {
        log.debug("Authenticating {}", email);

        return userRepository
                .findByEmail(email)
                .map(user -> createSpringSecurityUser(email, user))
                .orElseThrow(() -> new UsernameNotFoundException("User " + email + " was not found in the database"));
    }

    private org.springframework.security.core.userdetails.User createSpringSecurityUser(String email, User user) {
        if (!user.isActivated()) {
            throw new UserNotActivatedException("User " + email + " was not activated");
        }

        List<SimpleGrantedAuthority> grantedAuthorities = List.of(new SimpleGrantedAuthority(user.getRole().getName()));
        // List<SimpleGrantedAuthority> grantedAuthorities = user
        // .getRoles()
        // .stream()
        // .map(Role::getName)
        // .map(SimpleGrantedAuthority::new)
        // .toList();
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                grantedAuthorities);
    }
}
