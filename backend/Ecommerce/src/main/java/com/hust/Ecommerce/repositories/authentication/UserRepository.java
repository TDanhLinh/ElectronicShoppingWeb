package com.hust.Ecommerce.repositories.authentication;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.hust.Ecommerce.entities.User;
import com.hust.Ecommerce.util.ConfixSql;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    Optional<User> findByEmail(String email);

    Optional<User> findByActivationKey(String activationKey);

    Optional<User> findOneByResetKey(String resetKey);

    // lấy ra tất cả user (ngoại trừ admin) với truyền admin
    @Query(ConfixSql.User.GET_ALL_USER)
    Page<User> fillAll(@Param("keyword") String keyword, Pageable pageable);
}
