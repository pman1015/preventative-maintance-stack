package com.maintance.maintanceAPI.controller;

import com.maintance.maintanceAPI.model.Assignment;
import com.maintance.maintanceAPI.repository.assignmentRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/assignmentAPI")
public class assignmentController {

  @Autowired
  assignmentRepository assignmentRepository;

  @PreAuthorize("hasAuthority('admin')")
  @GetMapping("/admin/allAssignments")
  public ResponseEntity<List<Assignment>> getAllAssignments() {
    try {
      List<Assignment> assignments = new ArrayList<>();
      assignmentRepository.findAll().forEach(assignments::add);

      if (assignments.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(assignments, HttpStatus.OK);
    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/user/getAllVisibleAssignments")
  public ResponseEntity<List<Assignment>> getVisibleAssignments(
    @AuthenticationPrincipal UserDetails userDetails
  ) {
    if (userDetails.getAuthorities().isEmpty()) return new ResponseEntity<>(
      HttpStatus.NOT_FOUND
    );
    String role = userDetails.getAuthorities().iterator().next().getAuthority();
    List<Assignment> assignments = new ArrayList<>();
    if (role.equals("admin")) {
      assignmentRepository.findAll().forEach(assignments::add);
    } else {
      assignmentRepository.findByAccess(role).forEach(assignments::add);
    }
    if (assignments.isEmpty()) return new ResponseEntity<>(
      HttpStatus.NO_CONTENT
    );
    return new ResponseEntity<>(assignments, HttpStatus.OK);
  }

  @PostMapping("/admin/newAssignment")
  public ResponseEntity<Assignment> postMethodName(
    @RequestBody Assignment assignment
  ) {
    try {
      Assignment assignment_ = new Assignment();
      assignment_.setDue_date(assignment.getDue_date());
      assignment_.setAssignment_name(assignment.getAssignment_name());
      assignment_.setDescription(assignment.getDescription());
      assignment_.setAccess(assignment.getAccess());

      return (
        new ResponseEntity<>(
          assignmentRepository.save(assignment_),
          HttpStatus.OK
        )
      );
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
