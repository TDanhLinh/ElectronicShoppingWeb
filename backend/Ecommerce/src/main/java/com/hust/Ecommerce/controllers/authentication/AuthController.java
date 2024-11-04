package com.hust.Ecommerce.controllers.authentication;

import java.util.List;
import java.util.Optional;

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
import com.hust.Ecommerce.dtos.ApiResponse;
import com.hust.Ecommerce.dtos.authentication.AdminUserDTO;
import com.hust.Ecommerce.dtos.authentication.EmailInput;
import com.hust.Ecommerce.dtos.authentication.ForgotPasswordDTO;
import com.hust.Ecommerce.dtos.authentication.LoginResponse;
import com.hust.Ecommerce.dtos.authentication.LoginVM;
import com.hust.Ecommerce.dtos.authentication.ManagedUserVM;
import com.hust.Ecommerce.dtos.authentication.RefreshTokenDTO;
import com.hust.Ecommerce.exceptions.AppException;
import com.hust.Ecommerce.exceptions.ErrorCode;
import com.hust.Ecommerce.exceptions.payload.ResourceNotFoundException;

import com.hust.Ecommerce.models.Token;
import com.hust.Ecommerce.models.User;

import com.hust.Ecommerce.security.SecurityUtils;
import com.hust.Ecommerce.services.MailService;

import com.hust.Ecommerce.services.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

        private final UserService userService;
        private final MailService mailService;

        @PostMapping("/registration")
        public ResponseEntity<ApiResponse<?>> registerAccount(@Valid @RequestBody ManagedUserVM managedUserVM,
                        BindingResult bindingResult) {

                if (bindingResult.hasErrors()) {
                        List<String> errorMessages = bindingResult.getFieldErrors().stream()
                                        .map(DefaultMessageSourceResolvable::getDefaultMessage).toList();
                        return ResponseEntity.badRequest().body(
                                        ApiResponse.builder()
                                                        .message(MessageKeys.ERROR_MESSAGE)
                                                        .errors(errorMessages).build());
                }
                User user = userService.registerUser(managedUserVM, managedUserVM.getPassword());
                mailService.sendActivationEmail(user);

                return ResponseEntity.ok(ApiResponse.builder()
                                .success(true)
                                .message(MessageKeys.REGISTER_ACCOUNT_SUCCESS)
                                .build());

        }

        @GetMapping("/registration/confirm")
        public ResponseEntity<ApiResponse<?>> activateAccount(@RequestParam(value = "key") String key) {

                Optional<User> user = userService.activateRegistration(key);
                if (!user.isPresent()) {
                        throw new AppException(ErrorCode.INVALID_KEY);
                }
                return ResponseEntity.ok(ApiResponse.builder()
                                .message(MessageKeys.ACTIVE_ACCOUNT_SUCCESS)
                                .success(true)
                                .build());

        }

        @PostMapping("/login")
        public ResponseEntity<ApiResponse<?>> login(@Valid @RequestBody LoginVM loginVM,
                        BindingResult bindingResult) {

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

        }

        @GetMapping("/infor")
        public ResponseEntity<ApiResponse<?>> getAdminUserInfor() {

                AdminUserDTO userResponse = userService
                                .getUserWithAuthorities()
                                .map(AdminUserDTO::new)
                                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

                return ResponseEntity.ok(ApiResponse.builder()
                                .success(true)
                                .payload(userResponse)
                                .build());

        }

        // refreshToken
        @PostMapping("/refresh-token")
        public ResponseEntity<ApiResponse<?>> refreshToken(@RequestBody RefreshTokenDTO refreshTokenDTO) {

                Token newToken = userService.refreshToken(refreshTokenDTO.getRefreshToken());
                AdminUserDTO userResponse = new AdminUserDTO(newToken.getUser());

                return ResponseEntity.ok(ApiResponse.builder()
                                .success(true)
                                .payload(LoginResponse.builder()
                                                .token(newToken.getToken())
                                                .refreshToken(newToken.getRefreshToken())
                                                .user(userResponse)
                                                .build())
                                .build());

        }

        @PostMapping(path = "/forgot-password")
        public void forgotPassword(@RequestBody EmailInput email) {
                Optional<User> user = userService.forgetPassword(email.getEmail());
                if (user.isPresent()) {
                        mailService.sendPasswordResetMail(user.get());
                } else {

                        log.warn("Password reset requested for non existing mail");
                }
        }

        @PutMapping(path = "/reset-password")
        public ResponseEntity<ApiResponse<?>> resetPassword(@RequestBody ForgotPasswordDTO forgotPasswordDTO,
                        @RequestParam(value = "key") String key,
                        BindingResult bindingResult) {

                if (bindingResult.hasErrors()) {
                        List<String> errorMessages = bindingResult.getFieldErrors().stream()
                                        .map(DefaultMessageSourceResolvable::getDefaultMessage).toList();
                        return ResponseEntity.badRequest().body(
                                        ApiResponse.builder()
                                                        .message(MessageKeys.ERROR_MESSAGE)
                                                        .errors(errorMessages).build());
                }
                Optional<User> user = userService.resetPassword(forgotPasswordDTO.getPassword(),
                                key);

                if (!user.isPresent()) {
                        throw new ResourceNotFoundException(MessageKeys.USER_NOT_FOUND);
                }
                return ResponseEntity.ok(ApiResponse.builder()
                                .success(true).build());

        }

        @GetMapping("/logout")
        public ResponseEntity<ApiResponse<?>> logout() {

                String jwt = SecurityUtils.getCurrentUserJWT()
                                .orElseThrow(() -> new ResourceNotFoundException(MessageKeys.ACCOUNT_NOT_LOGIN));

                userService.logout(jwt);
                return ResponseEntity.ok(ApiResponse.builder()
                                .success(true)
                                .build());

        }
}
