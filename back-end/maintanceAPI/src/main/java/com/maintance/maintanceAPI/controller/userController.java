package com.maintance.maintanceAPI.controller;

import com.maintance.maintanceAPI.model.User;
import com.maintance.maintanceAPI.repository.userRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class userController {

  @Autowired
  userRepository userRepository;

  @GetMapping("/users")
  public ResponseEntity<List<User>> getUsers() {
    try {
      List<User> users = new ArrayList<>();
      userRepository.findAll().forEach(users::add);

      if (users.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(users, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("/users")
  public ResponseEntity<User> createUser(@RequestBody User user) {
    try {
      User _user = new User();
      _user.setUsername(user.getUsername());
      _user.setPassword(user.getPassword());
      if (user.getRole() == null) {
        _user.setRole("student");
      } else {
        _user.setRole(user.getRole());
      }
      userRepository.save(_user);
      return new ResponseEntity<>(_user, HttpStatus.CREATED);
    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("/validate")
  public ResponseEntity<User> getMethodName(@RequestBody User user) {
    try {
      User _user = new User();
      if (user.getUsername() == null || user.getPassword() == null) {
        return new ResponseEntity<>(null, HttpStatus.NOT_ACCEPTABLE);
      }
      List<User> result = userRepository.findByUsername(user.getUsername());
      if (result.size() > 0) {
        if (result.get(0).getPassword().equals(user.getPassword())) {
          return new ResponseEntity<>(result.get(0), HttpStatus.OK);
        } else {
          return new ResponseEntity<>(
            null,
            HttpStatus.NON_AUTHORITATIVE_INFORMATION
          );
        }
      } else {
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
    return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
