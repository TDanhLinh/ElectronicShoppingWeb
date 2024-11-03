package com.hust.Ecommerce.models;

import java.io.Serializable;
import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hust.Ecommerce.constants.Constants;
import com.hust.Ecommerce.models.enumeration.Gender;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User extends BaseEntity<Long> implements Serializable {

    @Column(name = "email", length = 100, unique = true, nullable = false)
    private String email;

    @JsonIgnore
    @Column(name = "password", length = 100, nullable = false)
    private String password;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @Pattern(regexp = Constants.PHONE_NUMBER)
    @Column(name = "phone_number", unique = true, length = 15)
    private String phoneNumber;

    @Column(name = "address", length = 200)
    private String address;

    @Column(name = "date_of_birth")
    private Instant dateOfBirth;

    @Size(max = 256)
    @Column(name = "image_url", length = 256)
    private String imageUrl;

    @Column(name = "facebook_account_id")
    @JsonIgnore
    private int facebookAccountId;

    @Column(name = "google_account_id")
    @JsonIgnore
    private int googleAccountId;

    @Column(name = "is_banned")
    private boolean isBanned;

    @Column(name = "is_activated")
    private boolean isActivated;

    @Size(max = 20)
    @Column(name = "activation_key", length = 20)
    @JsonIgnore
    private String activationKey;

    @Size(min = 2, max = 10)
    @Column(name = "lang_key", length = 10)
    private String langKey;

    @Size(max = 20)
    @Column(name = "reset_key", length = 20)
    @JsonIgnore
    private String resetKey;

    @Column(name = "reset_date")
    private Instant resetDate = null;

    @JsonIgnore
    @OneToOne
    // @JoinTable(name = "users_roles", joinColumns = {
    // @JoinColumn(name = "user_id", referencedColumnName = "id") },
    // inverseJoinColumns = {
    // @JoinColumn(name = "role_name", referencedColumnName = "name") })
    // @BatchSize(size = 20)
    private Role role;

}
