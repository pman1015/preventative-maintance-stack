package com.maintance.maintanceAPI.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;



@Entity
@Table(name="assignments")
@Data
public class Assignment {
    

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer assignment_id;
    
    private Date due_date;

    private String assignment_name;

    private String description;

    private String access;
    
}
