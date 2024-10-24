package com.hust.Ecommerce.services.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Set;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonProperty;

import com.hust.Ecommerce.models.Role;
import com.hust.Ecommerce.models.User;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserDTO implements Serializable {
    private Long id;

    @JsonProperty("full_name")
    private String fullName;

    @JsonProperty("email")

    private String email;

    private String address;

    @Size(max = 256)
    @JsonProperty("image_url")
    private String imageUrl;

    private boolean isActivated = false;

    @Size(min = 2, max = 10)
    @JsonProperty("lang_key")
    private String langKey;

    @JsonProperty("date_of_birth")
    private Instant dateOfBirth;

    @JsonProperty("facebook_account_id")
    private int facebookAccountId;

    @JsonProperty("google_account_id")
    private int googleAccountId;

    private String createdBy;

    private Instant createdDate;

    private String lastModifiedBy;

    private Instant lastModifiedDate;

    private Set<String> roles;

    public AdminUserDTO(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.fullName = user.getFullName();
        this.address = user.getAddress();
        this.isActivated = user.isActivated();
        this.imageUrl = user.getImageUrl();
        this.createdBy = user.getCreatedBy();
        this.createdDate = user.getCreatedDate();
        this.lastModifiedBy = user.getLastModifiedBy();
        this.lastModifiedDate = user.getLastModifiedDate();
        this.langKey = user.getLangKey();
        this.roles = user.getRoles().stream().map(Role::getName).collect(Collectors.toSet());
    }

}
