package ru.kata.spring.boot_security.demo.exceptions.exceptionResponse;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
@Setter
public class ExceptionResponse {

    private HttpStatus httpStatus;
    private String exceptionClassName;
    private String message;

}
