package com.hust.Ecommerce.web.rest;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.apache.tomcat.util.http.HeaderUtil;
import org.apache.tomcat.util.http.ResponseUtil;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.dao.PermissionDeniedDataAccessException;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hust.Ecommerce.constants.MessageKeys;
import com.hust.Ecommerce.constants.RoleKeys;
import com.hust.Ecommerce.dtos.responses.ApiResponse;
import com.hust.Ecommerce.dtos.responses.ListPageResponse;
import com.hust.Ecommerce.exceptions.payload.AccountAlreadyExistsException;
import com.hust.Ecommerce.exceptions.payload.EmailAlreadyUsedException;
import com.hust.Ecommerce.exceptions.payload.InvalidParamException;
import com.hust.Ecommerce.models.User;
import com.hust.Ecommerce.repositories.UserRepository;
import com.hust.Ecommerce.services.MailService;
import com.hust.Ecommerce.services.UserService;
import com.hust.Ecommerce.services.dto.AdminUserDTO;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("${api.prefix}/admin")
@RequiredArgsConstructor
@Slf4j
public class UserResource {
        private final UserService userService;

        private final UserRepository userRepository;

        private final MailService mailService;

        @PostMapping("/users")
        @PreAuthorize("hasAuthority(\"" + RoleKeys.ADMIN + "\")")
        public ResponseEntity<ApiResponse<?>> createUser(@Valid @RequestBody AdminUserDTO userDTO,
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
                        log.debug("REST request to save User : {}", userDTO);

                        if (userDTO.getId() != null) {
                                throw new InvalidParamException(MessageKeys.ERROR_MESSAGE);

                        } else if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
                                throw new EmailAlreadyUsedException(MessageKeys.EMAIL_EXISTED);
                        } else {
                                User newUser = userService.createUser(userDTO);
                                mailService.sendCreationEmail(newUser);
                                return ResponseEntity.created(new URI("/api/v1/admin/users/" + newUser.getEmail()))
                                                .body(ApiResponse.<User>builder()
                                                                .success(true)
                                                                .payload(newUser)
                                                                .build());
                        }
                } catch (Exception e) {
                        return ResponseEntity.badRequest().body(ApiResponse.builder()
                                        .error(e.getMessage())
                                        .message(MessageKeys.ERROR_MESSAGE)
                                        .build());
                }

        }

        @GetMapping("/users")
        @PreAuthorize("hasAuthority(\"" + RoleKeys.ADMIN + "\")")
        public ResponseEntity<ApiResponse<?>> getAllUsers(
                        @RequestParam(defaultValue = "", name = "keyword", required = false) String keyword,
                        @RequestParam(defaultValue = "0", name = "page") int page,
                        @RequestParam(defaultValue = "10", name = "limit") int limit) {
                try {
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
                } catch (Exception e) {
                        return ResponseEntity.badRequest().body(ApiResponse.builder()
                                        .error(e.getMessage()).build());
                }
        }

        // @PutMapping({ "/users", "/users/{email}" })
        // @PreAuthorize("hasAuthority(\"" + RoleKeys.ADMIN + "\")")
        // public ResponseEntity<AdminUserDTO> updateUser(
        // @PathVariable(name = "email", required = false) String email,
        // @Valid @RequestBody AdminUserDTO userDTO
        // ) {
        // log.debug("REST request to update User : {}", userDTO);

        // Optional<User> existingUser = userRepository.findByEmail(userDTO.getEmail());
        // if (existingUser.isPresent() &&
        // (!existingUser.orElseThrow().getId().equals(userDTO.getId()))) {
        // throw new EmailAlreadyUsedException(MessageKeys.EMAIL_EXISTED);
        // }

        // Optional<AdminUserDTO> updatedUser = userService.updateUser(userDTO);

        // return ResponseUtil.wrapOrNotFound(
        // updatedUser,
        // HeaderUtil.createAlert(applicationName, "userManagement.updated",
        // userDTO.getLogin())
        // );
        // }

        // @GetMapping("/users/{login}")
        // @PreAuthorize("hasAuthority(\"" + RoleKeys.ADMIN + "\")")
        // public ResponseEntity<AdminUserDTO> getUser(@PathVariable("email") /*
        // * @Pattern(regexp = Constants.LOGIN_REGEX)
        // */ String login) {
        // log.debug("REST request to get User : {}", login);
        // return ResponseUtil.wrapOrNotFound(
        // userService.getUserWithAuthoritiesByLogin(login).map(AdminUserDTO::new));
        // }

        @DeleteMapping("/users/{email}")
        @PreAuthorize("hasAuthority(\"" + RoleKeys.ADMIN + "\")")
        public ResponseEntity<Void> deleteUser(
                        @PathVariable("email") /* @Pattern(regexp = Constants.LOGIN_REGEX) */ String email) {
                log.debug("REST request to delete User: {}", email);
                userService.deleteUser(email);
                return ResponseEntity.noContent()
                                .build();
        }
}
