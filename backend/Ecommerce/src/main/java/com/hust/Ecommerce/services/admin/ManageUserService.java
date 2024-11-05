package com.hust.Ecommerce.services.admin;

import java.time.Instant;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hust.Ecommerce.constants.AppConstants;
import com.hust.Ecommerce.constants.MessageKeys;
import com.hust.Ecommerce.dtos.authentication.AdminUserDTO;
import com.hust.Ecommerce.entities.Role;
import com.hust.Ecommerce.entities.User;
import com.hust.Ecommerce.repositories.authentication.RoleRepository;
import com.hust.Ecommerce.repositories.authentication.UserRepository;
import com.hust.Ecommerce.util.RandomUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ManageUserService implements IManageUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    public User createUser(AdminUserDTO userDTO) {
        User user = new User();

        user.setEmail(userDTO.getEmail());
        user.setName(userDTO.getName());

        user.setImageUrl(userDTO.getImageUrl());

        if (userDTO.getLangKey() == null) {
            user.setLangKey(AppConstants.DEFAULT_LANGUAGE); // default language
        } else {
            user.setLangKey(userDTO.getLangKey());
        }

        String encryptedPassword = passwordEncoder.encode(RandomUtil.generatePassword());
        user.setPassword(encryptedPassword);

        user.setResetKey(RandomUtil.generateResetKey());
        user.setResetDate(Instant.now());

        user.setActivated(true);
        user.setBanned(false);

        if (userDTO.getRole() != null) {
            Optional<Role> role = roleRepository.findById(userDTO.getRole());
            if (role.isPresent()) {
                user.setRole(role.get());
            }
            // Set<Role> roles = userDTO
            // .getRole()
            // .map(roleRepository::findById)
            // .filter(Optional::isPresent)
            // .map(Optional::get)
            // .collect(Collectors.toSet());

            // user.setRoles(roles);
        }

        userRepository.save(user);
        log.debug("Created Information for User: {}", user);
        return user;
    }

    // public Optional<AdminUserDTO> updateUser(AdminUserDTO userDTO) {
    // return Optional.of(userRepository.findById(userDTO.getId()))
    // .filter(Optional::isPresent)
    // .map(Optional::get)
    // .map(user -> {
    // user.setName(userDTO.getName());
    // user.setImageUrl(userDTO.getImageUrl());
    // user.setActivated(userDTO.isActivated());
    // user.setLangKey(userDTO.getLangKey());
    // Set<Role> manageRoles = user.getRoles();
    // manageRoles.clear();

    // userDTO
    // .getRoles()
    // .stream()
    // .map(roleRepository::findById)
    // .filter(Optional::isPresent)
    // .map(Optional::get)
    // .forEach(manageRoles::add);

    // userRepository.save(user);

    // log.debug("Changed Information for User: {}", user);
    // return user;
    // })
    // .map(AdminUserDTO::new);
    // }

    public void deleteUser(Long id) {
        userRepository
                .findById(id)
                .ifPresent(user -> {
                    if (user.getRole().getName() != "ADMIN") {
                        userRepository.delete(user);
                        log.debug("Deleted User: {}", user);
                    } else {
                        throw new AccessDeniedException(MessageKeys.APP_PERMISSION_DENY_EXCEPTION);
                    }

                });
    }

    public Page<User> findAllUsers(String keyword, Pageable pageable) {
        return userRepository.fillAll(keyword, pageable);
    }
}
