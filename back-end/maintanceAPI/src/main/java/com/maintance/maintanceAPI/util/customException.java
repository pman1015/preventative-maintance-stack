package com.maintance.maintanceAPI.util;

import java.util.*;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.hibernate.annotations.DialectOverride.OverridesAnnotation;
import org.hibernate.engine.jdbc.spi.SqlExceptionHelper;
import org.hibernate.internal.util.collections.LinkedIdentityHashMap;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class customException {

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public Map<String, Object> handleMethodArgumentNotValid(
    MethodArgumentNotValidException exception
  ) {
    Map<String, Object> responseBody = new LinkedIdentityHashMap<>();
    List<String> errors = exception
      .getBindingResult()
      .getFieldErrors()
      .stream()
      .map(x -> x.getDefaultMessage())
      .collect(Collectors.toList());
    responseBody.put("errors", errors);
    return responseBody;
  }
}
