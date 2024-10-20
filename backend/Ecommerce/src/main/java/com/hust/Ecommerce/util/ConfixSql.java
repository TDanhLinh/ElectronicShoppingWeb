package com.hust.Ecommerce.util;

public class ConfixSql {
    public interface User {
        // lấy ra tất cả user với truyền admin
        String GET_ALL_USER = "SELECT o FROM User o WHERE o.isActivated = true AND (:keyword IS NULL OR :keyword = '' "
                +
                "OR o.fullName LIKE %:keyword% " +
                "OR o.address LIKE %:keyword% " +
                "OR o.email LIKE %:keyword%) ";
    }
}
