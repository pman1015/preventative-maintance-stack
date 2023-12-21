package com.maintance.maintanceAPI.services;

import com.maintance.maintanceAPI.model.User;
import com.maintance.maintanceAPI.repository.userRepository;
import jakarta.validation.constraints.Pattern;
import java.util.*;
import java.util.regex.Matcher;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.Validator;

@Service
public class userServices {
  @Autowired
  PasswordEncoder passwordEncoder;

  @Data
  public class ResponsePair {

    User user;
    HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
    List<User> users;
    List<String> errors = new ArrayList<String>();
    String message;
  }

  @Autowired
  private userRepository userRepository;

  public ResponsePair getAllUsers() {
    ResponsePair responsePair = new ResponsePair();
    try {
      List<User> users = new ArrayList<>();
      userRepository.findAll().forEach(users::add);
      responsePair.setUsers(users);
      if (users.isEmpty()) {
        responsePair.setStatus(HttpStatus.NO_CONTENT);
        return responsePair;
      }
      responsePair.setStatus(HttpStatus.OK);
      return responsePair;
    } catch (Exception e) {
      e.printStackTrace();
      responsePair.setMessage("Error: " + e.getStackTrace());
      return responsePair;
    }
  }

  public ResponsePair addUser(User user) {
    ResponsePair responsePair = new ResponsePair();
    try {
      user.setPassword(passwordEncoder.encode(user.getPassword()));
      responsePair.setUser(userRepository.save(user));
      responsePair.setStatus(HttpStatus.CREATED);
      return responsePair;
    } catch (Exception e) {
      java.util.regex.Pattern pattern = java.util.regex.Pattern.compile(
        "\\[([^]]*)",
        java.util.regex.Pattern.CASE_INSENSITIVE
      );
      Matcher matcher = pattern.matcher(e.getLocalizedMessage());
      while (matcher.find()) {
        responsePair.errors.add(matcher.group(1));
      }
      System.out.println(e.getLocalizedMessage());
    }

    return responsePair;
  }

  public ResponsePair getUser(User user) {
    ResponsePair response = new ResponsePair();
    try {
      Optional<User> result = userRepository.findByUsername(user.getUsername());

      if (result.isEmpty()) {
        response.setStatus(HttpStatus.NOT_FOUND);
        response.setMessage("Username not found");
        return response;
      }
      User found = result.get();
      if (!found.getPassword().equals(user.getPassword())) {
        response.setStatus(HttpStatus.NON_AUTHORITATIVE_INFORMATION);
        response.setMessage("Password invalid");
        return response;
      }
      response.setUser(found);
      response.setStatus(HttpStatus.OK);
      return response;
    } catch (Exception e) {
      e.printStackTrace();

      return response;
    }
  }
}
