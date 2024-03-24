package ru.kata.spring.boot_security.demo.exceptions;

public class BadCredentialsException extends RuntimeException{

    public BadCredentialsException(String message) {
        super(message);
    }
}
