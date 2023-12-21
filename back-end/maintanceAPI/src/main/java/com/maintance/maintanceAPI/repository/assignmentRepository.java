package com.maintance.maintanceAPI.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maintance.maintanceAPI.model.Assignment;


public interface assignmentRepository extends JpaRepository<Assignment,Integer>{
    
}
