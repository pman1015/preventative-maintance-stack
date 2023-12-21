package com.maintance.maintanceAPI.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.maintance.maintanceAPI.model.Assignment;
import com.maintance.maintanceAPI.repository.assignmentRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/assignmentAPI")
public class assignmentController {
    @Autowired
    assignmentRepository assignmentRepository;

    @GetMapping("/allAssignments")
    public ResponseEntity<List<Assignment>> getAllAssignments() {
        try{
            List<Assignment> assignments = new ArrayList<>();
        assignmentRepository.findAll().forEach(assignments::add);

        if(assignments.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(assignments,HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/newAssignment")
    public ResponseEntity<Assignment> postMethodName(@RequestBody Assignment assignment){ 
       try{
        Assignment assignment_ = new Assignment();
        assignment_.setDue_date(assignment.getDue_date());
        assignment_.setAssignment_name(assignment.getAssignment_name());
        assignment_.setDescription(assignment.getDescription());
        assignment_.setAccess(assignment.getAccess());

        return(new ResponseEntity<>(assignmentRepository.save(assignment_),HttpStatus.OK));

       }catch(Exception e){
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }

    
    
    
    
}
