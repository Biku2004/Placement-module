package com.spring.demo.backendplacementcell.controllers;

import com.spring.demo.backendplacementcell.entities.Student;
import com.spring.demo.backendplacementcell.services.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@RestController
//@RequestMapping("/api/staff")
//@CrossOrigin(origins = {"http://localhost:4200","https://placement-cell-cutm.netlify.app/"})
//public class StudentController {
//
//    @Autowired
//    private StaffService staffService;
//
//    @GetMapping
//    public List<Student> getAllStaff() {
//        return staffService.getAllStaff();
//    }
//}

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = {"http://localhost:4200", "https://placement-cell-cutm.netlify.app"})
@PreAuthorize("hasAuthority('Staff')") // Staff-only access
public class StaffController {
    @Autowired
    private StaffService staffService;

    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return staffService.getAllStudents(); // Should be renamed to getAllStudents() in StaffService
    }
}