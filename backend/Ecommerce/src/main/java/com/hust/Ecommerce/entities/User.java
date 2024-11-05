package com.hust.Ecommerce.entities;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hust.Ecommerce.constants.AppConstants;
import com.hust.Ecommerce.entities.enumeration.Gender;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User extends BaseEntity implements Serializable {

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

    @Pattern(regexp = AppConstants.PHONE_NUMBER)
    @Column(name = "phone_number", unique = true, length = 15)
    private String phoneNumber;

    @Column(name = "address", length = 200)
    private String address;

    @Column(name = "date_of_birth")
    private Instant dateOfBirth;

    @Size(max = 256)
    @Column(name = "avatar", length = 256)
    private String avatar;

    @Column(name = "facebook_account_id")
    @JsonIgnore
    private int facebookAccountId;

    @Column(name = "google_account_id")
    @JsonIgnore
    private int googleAccountId;

    @Column(name = "status", nullable = false, columnDefinition = "TINYINT")
    private Integer status;

    @Size(max = 20)
    @Column(name = "activation_key", length = 20)
    @JsonIgnore
    private String activationKey;

    @Size(min = 2, max = 10)
    @Column(name = "lang_key", length = 10, nullable = false)
    private String langKey;

    @Size(max = 20)
    @Column(name = "reset_key", length = 20)
    @JsonIgnore
    private String resetKey;

    @Column(name = "reset_date")
    private Instant resetDate = null;

    @ManyToOne
    @JoinColumn(name = "role_name")
    private Role role;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user", orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Blog> blogList = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user", orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Order> orderList = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user", orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Token> tokenList = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user", orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Review> reviewList = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user", orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<ShippingInfor> shippingInforList = new ArrayList<>();

}
