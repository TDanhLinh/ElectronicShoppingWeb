package com.hust.Ecommerce.dtos.authentication;

import java.io.Serializable;
import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.hust.Ecommerce.entities.authentication.User;
import com.hust.Ecommerce.entities.enumeration.Gender;
import com.hust.Ecommerce.util.InstantDateOnlyDeserializer;

import jakarta.validation.constraints.NotNull;
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
    @NotNull(message = "field name is not accept null")
    private String name;

    private Gender gender;

    @JsonProperty("phone_number")
    private String phoneNumber;

    private String address;

    @JsonProperty("date_of_birth")
    @JsonDeserialize(using = InstantDateOnlyDeserializer.class)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "UTC")
    private Instant dateOfBirth;

    @JsonProperty("avatar")
    private String avatar;

    private String status = "USER";

    @Size(min = 2, max = 10)
    @JsonProperty("language")
    private String language;

    @JsonProperty("facebook_account_id")
    private int facebookAccountId;

    @JsonProperty("google_account_id")
    private int googleAccountId;

    private Instant createdAt;
    private Instant updatedAt;
    @JsonProperty("role")
    private String role;

    public AdminUserDTO(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.name = user.getName();
        this.address = user.getAddress();
        this.phoneNumber = user.getPhoneNumber();
        this.dateOfBirth = user.getDateOfBirth();
        this.gender = user.getGender();
        this.status = user.getStatus().toString();
        this.avatar = user.getAvatar();
        this.createdAt = user.getCreatedAt();
        this.updatedAt = user.getUpdatedAt();
        this.language = user.getLanguage();
        this.role = user.getRole().getName();
    }

}
