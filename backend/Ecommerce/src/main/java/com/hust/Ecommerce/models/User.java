package com.hust.Ecommerce.models;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.BatchSize;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "users")
public class User extends AbstractAuditingEntity<Long> implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", length = 100)
    private String fullName;

    @Column(name = "email", length = 100, unique = true, nullable = false)
    private String email;

    @Column(name = "address", length = 200)
    private String address;

    @Size(max = 256)
    @Column(name = "image_url", length = 256)
    private String imageUrl;

    @JsonIgnore
    @Column(name = "password", length = 100, nullable = false)
    private String password;

    @Column(name = "is_activated")
    private boolean isActivated;

    @Column(name = "date_of_birth")
    private Instant dateOfBirth;

    @Column(name = "facebook_account_id")
    @JsonIgnore
    private int facebookAccountId;

    @Column(name = "google_account_id")
    @JsonIgnore
    private int googleAccountId;

    @Size(max = 20)
    @Column(name = "activation_key", length = 20)
    @JsonIgnore
    private String activationKey;

    @Size(max = 20)
    @Column(name = "reset_key", length = 20)
    @JsonIgnore
    private String resetKey;

    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "users_roles", joinColumns = {
            @JoinColumn(name = "user_id", referencedColumnName = "id") }, inverseJoinColumns = {
                    @JoinColumn(name = "role_name", referencedColumnName = "name") })
    @BatchSize(size = 20)
    private Set<Role> roles = new HashSet<>();

    @Override
    public Long getId() {
        return id;
    }

}
