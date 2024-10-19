package com.hust.Ecommerce.web.rest;

import java.util.List;
import java.util.Optional;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hust.Ecommerce.constants.MessageKeys;
import com.hust.Ecommerce.dtos.responses.ApiResponse;
import com.hust.Ecommerce.exceptions.payload.DataNotFoundException;
import com.hust.Ecommerce.models.User;
import com.hust.Ecommerce.services.UserService;
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
            String jwt = userService.login(loginVM.getEmail(), loginVM.getPassword());
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setBearerAuth(jwt);
            return new ResponseEntity<>(ApiResponse.builder().success(true).payload(null).build(),
                    httpHeaders,
                    HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    ApiResponse.builder()
                            .message(MessageKeys.LOGIN_FAILED)
                            .error(e.getMessage()).build());
        }

    }

}
