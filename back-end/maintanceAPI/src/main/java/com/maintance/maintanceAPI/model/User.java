package com.maintance.maintanceAPI.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;


@Entity
@Table(name = "users")
@Data
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer user_id;

  @NotNull(message = "username must not be null")
  @Column(name = "username",unique = true)
  private String username;

  @NotNull(message = "password must not be null")
  @Column(name = "password")
  private String password;

  @Pattern(regexp = "^(admin|user)$" ,message = "Role must be user or admin")
  @Column(name = "role")
  private String role;
}
