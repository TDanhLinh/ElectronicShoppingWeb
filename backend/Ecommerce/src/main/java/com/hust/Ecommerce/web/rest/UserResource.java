package com.hust.Ecommerce.web.rest;

import org.apache.tomcat.util.http.HeaderUtil;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hust.Ecommerce.constants.RoleKeys;
import com.hust.Ecommerce.dtos.responses.ApiResponse;
import com.hust.Ecommerce.dtos.responses.ListPageResponse;
import com.hust.Ecommerce.exceptions.payload.EmailAlreadyUsedException;
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

        // @PostMapping("/users")
        // @PreAuthorize("hasAuthority(\"" + RoleKeys.ADMIN + "\")")
        // public ResponseEntity<ApiResponse<?>> createUser(@Valid @RequestBody
        // AdminUserDTO userDTO) throws Exception {
        // log.debug("REST request to save User : {}", userDTO);

        // if (userDTO.getId() != null) {
        // throw new BadRequestAlertException("A new user cannot already have an ID",
        // "userManagement", "idexists");
        // // Lowercase the user login before comparing with database
        // } else if
        // (userRepository.findOneByLogin(userDTO.getLogin().toLowerCase()).isPresent())
        // {
        // throw new LoginAlreadyUsedException();
        // } else if
        // (userRepository.findOneByEmailIgnoreCase(userDTO.getEmail()).isPresent()) {
        // throw new EmailAlreadyUsedException();
        // } else {
        // User newUser = userService.createUser(userDTO);
        // mailService.sendCreationEmail(newUser);
        // return ResponseEntity.created(new URI("/api/admin/users/" +
        // newUser.getLogin()))
        // .headers(HeaderUtil.createAlert(applicationName, "userManagement.created",
        // newUser.getLogin()))
        // .body(newUser);
        // }
        // }

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
}
