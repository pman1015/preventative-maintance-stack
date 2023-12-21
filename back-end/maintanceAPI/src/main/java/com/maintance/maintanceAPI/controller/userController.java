package com.maintance.maintanceAPI.controller;

import com.maintance.maintanceAPI.model.AuthRequest;
import com.maintance.maintanceAPI.model.User;
import com.maintance.maintanceAPI.services.JwtService;
import com.maintance.maintanceAPI.services.userServices;
import com.maintance.maintanceAPI.services.userServices.ResponsePair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/userAPI")
public class userController {

  @Autowired
  userServices userServices;

  @Autowired
  private JwtService jwtService;

  @Autowired
  private AuthenticationManager authenitcationManager;

  @PostMapping("/generateToken")
  public String authenticateAndGetToken(@RequestBody AuthRequest authrequest) {
    Authentication authentication = authenitcationManager.authenticate(
      new UsernamePasswordAuthenticationToken(
        authrequest.getUsername(),
        authrequest.getPassword()
      )
    );
    if (authentication.isAuthenticated()) {
      return jwtService.generateToken(authrequest.getUsername());
    } else {
      throw new UsernameNotFoundException("invalid authentication");
    }
  }

  @GetMapping("/admin/users")
  @PreAuthorize("hasAuthority('admin')")
  public ResponseEntity<Object> getUsers() {
    ResponsePair toReturn = userServices.getAllUsers();
    return new ResponseEntity<>(toReturn, toReturn.getStatus());
  }

  @PostMapping("/addUser")
  public ResponseEntity<ResponsePair> createUser(
    @Validated @RequestBody User user
  ) {
    ResponsePair response = userServices.addUser(user);
    return new ResponseEntity<>(response, response.getStatus());
  }

  @PostMapping("/validate")
  public ResponseEntity<Object> getMethodName(
    @Validated @RequestBody User user
  ) {
    ResponsePair result = userServices.getUser(user);
    return new ResponseEntity<>(result, result.getStatus());
  }
}
