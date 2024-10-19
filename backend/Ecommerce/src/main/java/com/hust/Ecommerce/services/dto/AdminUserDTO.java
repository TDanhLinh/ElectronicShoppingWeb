package com.hust.Ecommerce.services.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hust.Ecommerce.constants.MessageKeys;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class AdminUserDTO implements Serializable {
    private Long id;

    @JsonProperty("full_name")
    private String fullName;

    @JsonProperty("email")
    @NotBlank(message = MessageKeys.EMAIL_REQUIRED)
    private String email;

    private String address;

    @Size(max = 256)
    @JsonProperty("image_url")
    private String imageUrl;

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

}
