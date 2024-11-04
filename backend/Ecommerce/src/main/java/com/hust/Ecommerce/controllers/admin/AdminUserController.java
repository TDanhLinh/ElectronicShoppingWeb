package com.hust.Ecommerce.controllers.admin;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hust.Ecommerce.constants.MessageKeys;
import com.hust.Ecommerce.constants.RoleKeys;
import com.hust.Ecommerce.dtos.ApiResponse;
import com.hust.Ecommerce.dtos.ListPageResponse;
import com.hust.Ecommerce.dtos.authentication.AdminUserDTO;
import com.hust.Ecommerce.exceptions.AppException;
import com.hust.Ecommerce.exceptions.ErrorCode;
import com.hust.Ecommerce.exceptions.payload.InvalidParamException;
import com.hust.Ecommerce.exceptions.payload.ResourceNotFoundException;
import com.hust.Ecommerce.models.User;
import com.hust.Ecommerce.repositories.UserRepository;
import com.hust.Ecommerce.services.MailService;
import com.hust.Ecommerce.services.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminUserController {

    private final UserService userService;

    private final UserRepository userRepository;

    private final MailService mailService;

    @PostMapping("/users")
    @PreAuthorize("hasAuthority(\"" + RoleKeys.ADMIN + "\")")
    public ResponseEntity<ApiResponse<?>> createUser(@Valid @RequestBody AdminUserDTO userDTO,
            BindingResult bindingResult) throws URISyntaxException {
        if (bindingResult.hasErrors()) {
            List<String> errorMessages = bindingResult.getFieldErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage).toList();
            return ResponseEntity.badRequest().body(
                    ApiResponse.builder()
                            .message(MessageKeys.ERROR_MESSAGE)
                            .errors(errorMessages).build());
        }
        log.debug("REST request to save User : {}", userDTO);

        if (userDTO.getId() != null) {
            throw new InvalidParamException(MessageKeys.ERROR_MESSAGE);

        } else if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }
        User newUser = userService.createUser(userDTO);
        mailService.sendCreationEmail(newUser);
        return ResponseEntity.created(new URI("/api/v1/admin/users/" + newUser.getEmail()))
                .body(ApiResponse.builder()
                        .success(true)
                        .build());

    }

    @GetMapping("/users")
    @PreAuthorize("hasAuthority(\"" + RoleKeys.ADMIN + "\")")
    public ResponseEntity<ApiResponse<?>> getAllUsers(
            @RequestParam(defaultValue = "", name = "keyword", required = false) String keyword,
            @RequestParam(defaultValue = "0", name = "page") int page,
            @RequestParam(defaultValue = "10", name = "limit") int limit) {

        PageRequest pageRequest = PageRequest.of(page, limit,
                Sort.by("id").ascending());

        Page<AdminUserDTO> usersPage = userService.findAllUsers(keyword, pageRequest)
                .map(user -> new AdminUserDTO(user));

        List<AdminUserDTO> userResponses = usersPage.getContent();

        return ResponseEntity.ok(ApiResponse.builder()
                .success(true)
                .payload(
                        ListPageResponse.<AdminUserDTO>builder()
                                .list(userResponses)
                                .pageNumber(page)
                                .totalElements(usersPage.getTotalElements())
                                .pageSize(usersPage.getSize())
                                .isLast(usersPage.isLast())
                                .totalPages(usersPage.getTotalPages())
                                .build())
                .build());
    }

    // @PutMapping("/users/{id}")
    // @PreAuthorize("hasAuthority(\"" + RoleKeys.ADMIN + "\")")
    // public ResponseEntity<ApiResponse<?>> updateUser(
    // @PathVariable(name = "id", required = true) Long id,
    // @Valid @RequestBody AdminUserDTO userDTO, BindingResult bindingResult) {
    // try {
    // if (bindingResult.hasErrors()) {
    // List<String> errorMessages = bindingResult.getFieldErrors().stream()
    // .map(DefaultMessageSourceResolvable::getDefaultMessage).toList();
    // return ResponseEntity.badRequest().body(
    // ApiResponse.builder()
    // .message(MessageKeys.ERROR_MESSAGE)
    // .errors(errorMessages).build());
    // }

    // log.debug("REST request to update User : {}", userDTO);

    // Optional<User> existingUser = userRepository.findById(id);
    // if (existingUser.isPresent() &&
    // (!existingUser.orElseThrow().getEmail().equals(userDTO.getEmail()))) {
    // throw new EmailAlreadyUsedException(MessageKeys.EMAIL_EXISTED);
    // }

    // Optional<AdminUserDTO> updatedUser = userService.updateUser(userDTO);
    // if (updatedUser.isEmpty()) {
    // throw new UsernameNotFoundException(MessageKeys.USER_NOT_FOUND);
    // }
    // return ResponseEntity.ok(ApiResponse.builder()
    // .success(true)
    // .payload(updatedUser)
    // .build());

    // } catch (Exception e) {
    // return ResponseEntity.badRequest().body(ApiResponse.builder()
    // .error(e.getMessage())
    // .message(MessageKeys.ERROR_MESSAGE)
    // .build());
    // }
    // }

    @GetMapping("/users/{id}")
    @PreAuthorize("hasAuthority(\"" + RoleKeys.ADMIN + "\")")
    public ResponseEntity<ApiResponse<?>> getUser(@PathVariable("id") Long id) {

        log.debug("REST request to get User : {}", id);
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()) {
            throw new ResourceNotFoundException(MessageKeys.USER_NOT_FOUND);
        }
        return ResponseEntity.ok(ApiResponse.<AdminUserDTO>builder()
                .success(true)
                .payload(new AdminUserDTO(user.get()))
                .build());
    }

    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasAuthority(\"" + RoleKeys.ADMIN + "\")")
    public ResponseEntity<ApiResponse<?>> deleteUser(
            @PathVariable("id") /* @Pattern(regexp = Constants.LOGIN_REGEX) */ Long id) {

        log.debug("REST request to delete User: {}", id);
        userService.deleteUser(id);
        return ResponseEntity.ok(ApiResponse.builder().success(true).build());

    }
}
