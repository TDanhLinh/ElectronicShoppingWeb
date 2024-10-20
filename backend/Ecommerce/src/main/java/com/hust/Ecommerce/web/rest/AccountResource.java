package com.hust.Ecommerce.web.rest;

import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties.Admin;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hust.Ecommerce.constants.MessageKeys;
import com.hust.Ecommerce.dtos.requests.PasswordChangeDTO;
import com.hust.Ecommerce.dtos.requests.RefreshTokenDTO;
import com.hust.Ecommerce.dtos.responses.ApiResponse;
import com.hust.Ecommerce.dtos.responses.LoginResponse;
import com.hust.Ecommerce.exceptions.payload.DataNotFoundException;
import com.hust.Ecommerce.exceptions.payload.EmailAlreadyUsedException;
import com.hust.Ecommerce.exceptions.payload.InvalidPasswordException;
import com.hust.Ecommerce.models.Token;
import com.hust.Ecommerce.models.User;
import com.hust.Ecommerce.repositories.TokenRepository;
import com.hust.Ecommerce.security.SecurityUtils;
import com.hust.Ecommerce.services.TokenService;
import com.hust.Ecommerce.services.UserService;
import com.hust.Ecommerce.services.dto.AdminUserDTO;
import com.hust.Ecommerce.web.rest.vm.LoginVM;
import com.hust.Ecommerce.web.rest.vm.ManagedUserVM;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("${api.prefix}")
@RequiredArgsConstructor
public class AccountResource {

        private final UserService userService;

        @PostMapping("/register")
        public ResponseEntity<ApiResponse<?>> registerAccount(@Valid @RequestBody ManagedUserVM managedUserVM,
                        BindingResult bindingResult) {
                try {
                        if (bindingResult.hasErrors()) {
                                List<String> errorMessages = bindingResult.getFieldErrors().stream()
                                                .map(DefaultMessageSourceResolvable::getDefaultMessage).toList();
                                return ResponseEntity.badRequest().body(
                                                ApiResponse.builder()
                                                                .message(MessageKeys.ERROR_MESSAGE)
                                                                .errors(errorMessages).build());
                        }
                        User user = userService.registerUser(managedUserVM, managedUserVM.getPassword());
                        // mailService.sendActivationEmail(user);
                        return ResponseEntity.ok(ApiResponse.builder()
                                        .success(true)
                                        .message(MessageKeys.REGISTER_ACCOUNT_SUCCESS)
                                        .build());
                } catch (Exception e) {
                        return ResponseEntity.badRequest().body(ApiResponse.builder()
                                        .error(e.getMessage())
                                        .message(MessageKeys.ERROR_MESSAGE)
                                        .build());
                }

        }

        @GetMapping("/activate")
        public ResponseEntity<ApiResponse<?>> activateAccount(@RequestParam(value = "key") String key) {
                try {
                        Optional<User> user = userService.activateRegistration(key);
                        if (!user.isPresent()) {
                                throw new DataNotFoundException(MessageKeys.USER_NOT_FOUND);
                        }
                        return ResponseEntity.ok().body(ApiResponse.builder()
                                        .message(MessageKeys.ACTIVE_ACCOUNT_SUCCESS)
                                        .success(true)
                                        .build());
                } catch (Exception e) {
                        return ResponseEntity.badRequest().body(ApiResponse.builder()
                                        .error(e.getMessage())
                                        .message(MessageKeys.ERROR_MESSAGE)
                                        .build());
                }

        }

        @PostMapping("/login")
        public ResponseEntity<ApiResponse<?>> login(@Valid @RequestBody LoginVM loginVM,
                        BindingResult bindingResult) {
                try {
                        if (bindingResult.hasErrors()) {
                                List<String> errorMessages = bindingResult.getFieldErrors().stream()
                                                .map(DefaultMessageSourceResolvable::getDefaultMessage).toList();
                                return ResponseEntity.badRequest().body(
                                                ApiResponse.builder()
                                                                .message(MessageKeys.LOGIN_FAILED)
                                                                .errors(errorMessages)
                                                                .build());
                        }

                        Token token = userService.login(loginVM.getEmail(), loginVM.getPassword());

                        AdminUserDTO userResponse = new AdminUserDTO(token.getUser());

                        HttpHeaders httpHeaders = new HttpHeaders();
                        httpHeaders.setBearerAuth(token.getToken());

                        return new ResponseEntity<>(ApiResponse.builder()
                                        .success(true)
                                        .payload(LoginResponse.builder()
                                                        .token(token.getToken())
                                                        .refreshToken(token.getRefreshToken())
                                                        .user(userResponse)
                                                        .build())
                                        .build(), httpHeaders, HttpStatus.OK);
                } catch (Exception e) {
                        return ResponseEntity.badRequest().body(
                                        ApiResponse.builder()
                                                        .message(MessageKeys.LOGIN_FAILED)
                                                        .error(e.getMessage()).build());
                }

        }

        @GetMapping("/account")
        public ResponseEntity<ApiResponse<?>> getAccount() {
                try {
                        AdminUserDTO userResponse = userService
                                        .getUserWithAuthorities()
                                        .map(AdminUserDTO::new)
                                        .orElseThrow(() -> new DataNotFoundException(MessageKeys.USER_NOT_FOUND));

                        return ResponseEntity.ok(ApiResponse.builder()
                                        .success(true)
                                        .payload(userResponse)
                                        .build());

                } catch (Exception e) {
                        return ResponseEntity.badRequest().body(
                                        ApiResponse.<AdminUserDTO>builder()
                                                        .message(MessageKeys.MESSAGE_ERROR_GET)
                                                        .error(e.getMessage())
                                                        .build());
                }

        }

        @PutMapping("/account")
        public ResponseEntity<ApiResponse<?>> saveAccount(@Valid @RequestBody AdminUserDTO userDTO) {

                try {
                        String email = SecurityUtils.getCurrentUserLogin()
                                        .orElseThrow(() -> new DataNotFoundException(MessageKeys.ACCOUNT_NOT_LOGIN));

                        Optional<User> user = userService.getUserWithAuthoritiesByEmail(email);
                        if (!user.isPresent()) {
                                throw new DataNotFoundException(MessageKeys.USER_NOT_FOUND);
                        }

                        userService.updateUser(
                                        userDTO.getFullName(),
                                        userDTO.getAddress(),
                                        userDTO.getImageUrl(),
                                        userDTO.getDateOfBirth());
                        return ResponseEntity.ok(ApiResponse.builder()
                                        .success(true)
                                        .build());
                } catch (Exception e) {
                        return ResponseEntity.badRequest().body(
                                        ApiResponse.builder()
                                                        .message(MessageKeys.MESSAGE_ERROR_GET)
                                                        .error(e.getMessage())
                                                        .build());
                }

        }

        @PutMapping(path = "/account/change-password")
        public ResponseEntity<ApiResponse<?>> changePassword(@RequestBody PasswordChangeDTO passwordChangeDto,
                        BindingResult bindingResult) {
                try {
                        if (bindingResult.hasErrors()) {
                                List<String> errorMessages = bindingResult.getFieldErrors().stream()
                                                .map(DefaultMessageSourceResolvable::getDefaultMessage).toList();
                                return ResponseEntity.badRequest().body(
                                                ApiResponse.builder()
                                                                .message(MessageKeys.ERROR_MESSAGE)
                                                                .errors(errorMessages).build());
                        }
                        userService.changePassword(passwordChangeDto.getCurrentPassword(),
                                        passwordChangeDto.getNewPassword());
                        return ResponseEntity.ok(ApiResponse.builder()
                                        .success(true)
                                        .build());
                } catch (Exception e) {
                        return ResponseEntity.badRequest().body(ApiResponse.builder()
                                        .error(e.getMessage())
                                        .message(MessageKeys.ERROR_MESSAGE)
                                        .build());
                }

        }

        // // refreshToken
        // @PostMapping("/refresh-token")
        // public ResponseEntity<ApiResponse<?>> refreshToken(@RequestBody
        // RefreshTokenDTO refreshTokenDTO) {
        // try {
        // Token newToken = userService.refreshToken(refreshTokenDTO);
        // AdminUserDTO userResponse = new AdminUserDTO(newToken.getUser());

        // return ResponseEntity.ok(ApiResponse.builder()
        // .success(true)
        // .payload(LoginResponse.builder()
        // .token(newToken.getToken())
        // .refreshToken(newToken.getRefreshToken())
        // .user(userResponse)
        // .build())
        // .build());
        // } catch (Exception e) {
        // return ResponseEntity.badRequest().body(ApiResponse.builder()
        // .error(e.getMessage())
        // .message(MessageKeys.ERROR_REFRESH_TOKEN)
        // .build());
        // }
        // }

        // @PostMapping(path = "/account/reset-password/init")
        // public void requestPasswordReset(@RequestBody String mail) {
        // Optional<User> user = userService.requestPasswordReset(mail);
        // if (user.isPresent()) {
        // mailService.sendPasswordResetMail(user.orElseThrow());
        // } else {
        // // Pretend the request has been successful to prevent checking which emails
        // really exist
        // // but log that an invalid attempt has been made
        // log.warn("Password reset requested for non existing mail");
        // }
        // }

        // @PostMapping(path = "/account/reset-password/finish")
        // public void finishPasswordReset(@RequestBody KeyAndPasswordVM keyAndPassword)
        // {
        // if (isPasswordLengthInvalid(keyAndPassword.getNewPassword())) {
        // throw new InvalidPasswordException();
        // }
        // Optional<User> user =
        // userService.completePasswordReset(keyAndPassword.getNewPassword(),
        // keyAndPassword.getKey());

        // if (!user.isPresent()) {
        // throw new AccountResourceException("No user was found for this reset key");
        // }
        // }

}
