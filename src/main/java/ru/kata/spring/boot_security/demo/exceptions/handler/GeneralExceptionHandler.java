package ru.kata.spring.boot_security.demo.exceptions.handler;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ru.kata.spring.boot_security.demo.exceptions.BadCredentialsException;
import ru.kata.spring.boot_security.demo.exceptions.UserNotFoundException;
import ru.kata.spring.boot_security.demo.exceptions.exceptionResponse.ExceptionResponse;

@RestControllerAdvice
public class GeneralExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionResponse userNotFoundException(UserNotFoundException unfe) {
        return new ExceptionResponse(HttpStatus.NOT_FOUND, unfe.getClass().getName(), unfe.getMessage());
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ExceptionResponse badCredentialHandle(BadCredentialsException bce) {
        return new ExceptionResponse(HttpStatus.FORBIDDEN, bce.getClass().getName(), bce.getMessage());
    }

}
