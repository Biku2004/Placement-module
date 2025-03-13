package com.spring.demo.backendplacementcell.controllers;

import com.spring.demo.backendplacementcell.entities.Student;
import com.spring.demo.backendplacementcell.services.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = {"http://localhost:4200","https://placement-cell-cutm.netlify.app/"})
public class StudentController {

//    @Autowired
//    private StaffService staffService;
//
//    @GetMapping
//    public List<Student> getAllStaff() {
//        return staffService.getAllStaff();
//    }
}