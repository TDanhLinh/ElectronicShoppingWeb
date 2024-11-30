package com.hust.Ecommerce.constants;

public interface AppConstants {
    String DEFAULT_LANGUAGE = "en";
    String SYSTEM = "system";

    String PHONE_NUMBER = "^\\+?[0-9]{10,15}$";

    String FRONTEND_HOST = "http://localhost:3000";
    String BACKEND_HOST = "http://localhost:8080";
    String DEFAULT_PAGE_NUMBER = "1";
    String DEFAULT_PAGE_SIZE = "100";
    String DEFAULT_SORT = "id,desc";
    double DEFAULT_TAX = 0.1;
}
