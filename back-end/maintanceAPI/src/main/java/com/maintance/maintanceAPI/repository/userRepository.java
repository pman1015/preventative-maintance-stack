package com.maintance.maintanceAPI.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

import com.maintance.maintanceAPI.model.User;

public interface userRepository extends JpaRepository<User,Integer> {
    Optional<User> findByUsername(String username);
    
} 