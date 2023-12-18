package com.maintance.maintanceAPI.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import com.maintance.maintanceAPI.model.User;

public interface userRepository extends JpaRepository<User,Integer> {
    List<User> findByUsername(String username);
    
} 