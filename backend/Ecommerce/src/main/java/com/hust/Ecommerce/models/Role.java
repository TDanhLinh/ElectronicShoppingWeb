package com.hust.Ecommerce.models;

import java.io.Serializable;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "roles")
public class Role implements Serializable {
    @NotNull
    @Size(max = 50)
    @Id
    @Column(name = "name", length = 50, nullable = false)
    private String name;

    private String description;
}