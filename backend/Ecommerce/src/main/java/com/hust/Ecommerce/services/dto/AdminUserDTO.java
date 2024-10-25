package com.hust.Ecommerce.services.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Set;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.hust.Ecommerce.models.Role;
import com.hust.Ecommerce.models.User;
import com.hust.Ecommerce.models.enumeration.Gender;
import com.hust.Ecommerce.util.InstantDateOnlyDeserializer;

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

    @JsonProperty("email")
    private String email;

    @JsonProperty("name")
    private String name;

    private Gender gender;

    @JsonProperty("phone_number")
    private String phoneNumber;

    private String address;

    @JsonProperty("date_of_birth")
    @JsonDeserialize(using = InstantDateOnlyDeserializer.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "UTC")
    private Instant dateOfBirth;

    @JsonProperty("image_url")
    private String imageUrl;

    private boolean isActivated = false;

    private boolean isBanned = false;

    @Size(min = 2, max = 10)
    @JsonProperty("lang_key")
    private String langKey;

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
        this.name = user.getName();
        this.address = user.getAddress();
        this.phoneNumber = user.getPhoneNumber();
        this.dateOfBirth = user.getDateOfBirth();
        this.gender = user.getGender();
        this.isActivated = user.isActivated();
        this.isBanned = user.isBanned();
        this.imageUrl = user.getImageUrl();
        this.createdBy = user.getCreatedBy();
        this.createdDate = user.getCreatedDate();
        this.lastModifiedBy = user.getLastModifiedBy();
        this.lastModifiedDate = user.getLastModifiedDate();
        this.langKey = user.getLangKey();

        this.roles = user.getRoles().stream().map(Role::getName).collect(Collectors.toSet());
    }

}
