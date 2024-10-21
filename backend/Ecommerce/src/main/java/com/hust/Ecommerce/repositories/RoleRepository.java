package com.hust.Ecommerce.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hust.Ecommerce.models.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {

}
