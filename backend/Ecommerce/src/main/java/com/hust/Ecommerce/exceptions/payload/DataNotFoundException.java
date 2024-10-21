package com.hust.Ecommerce.exceptions.payload;

public class DataNotFoundException extends RuntimeException {
    public DataNotFoundException(String message) {
        super(message);
    }
}
