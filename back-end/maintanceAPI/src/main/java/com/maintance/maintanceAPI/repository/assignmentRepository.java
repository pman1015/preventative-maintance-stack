package com.maintance.maintanceAPI.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maintance.maintanceAPI.model.Assignment;
import java.util.List;
import java.util.Optional;



public interface assignmentRepository extends JpaRepository<Assignment,Integer>{
    List<Assignment>findByAccess(String access);
}
