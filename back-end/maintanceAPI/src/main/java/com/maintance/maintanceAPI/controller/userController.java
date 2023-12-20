package com.maintance.maintanceAPI.controller;

import com.maintance.maintanceAPI.model.User;
import com.maintance.maintanceAPI.repository.userRepository;
import com.maintance.maintanceAPI.services.userServices;
import com.maintance.maintanceAPI.services.userServices.ResponsePair;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.server.mvc.BasicLinkBuilder;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/userAPI")
public class userController {



  @Autowired
  userServices userServices;

  @GetMapping("/users")
  public ResponseEntity<Object> getUsers() {
     ResponsePair toReturn = userServices.getAllUsers();
     return new ResponseEntity<>(toReturn,toReturn.getStatus());
    
  }

  @PostMapping("/users")
  public ResponseEntity<ResponsePair> createUser(@Validated @RequestBody User user) {
    ResponsePair response = userServices.addUser(user);
    return new ResponseEntity<>(response,response.getStatus());
  }

  @PostMapping("/validate")
  public ResponseEntity<Object> getMethodName(@Validated @RequestBody User user) {
     ResponsePair result = userServices.getUser(user);
     return new ResponseEntity<>(result,result.getStatus());
  }
}
