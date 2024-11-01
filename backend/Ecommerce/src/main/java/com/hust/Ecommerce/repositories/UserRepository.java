package com.hust.Ecommerce.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hust.Ecommerce.models.User;
import com.hust.Ecommerce.util.ConfixSql;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByActivationKey(String activationKey);

    Optional<User> findOneByResetKey(String resetKey);

    // lấy ra tất cả user (ngoại trừ admin) với truyền admin
    @Query(ConfixSql.User.GET_ALL_USER)
    Page<User> fillAll(@Param("keyword") String keyword, Pageable pageable);
}
