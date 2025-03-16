//package com.spring.demo.backendplacementcell.controllers;
//
//
//import com.spring.demo.backendplacementcell.entities.StudentProfile;
//import com.spring.demo.backendplacementcell.services.StudentProfileServices;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/recruiter/students")
//public class StudentProfileController {
//    @Autowired
//    private StudentProfileServices studentProfileService;
//
//    @GetMapping("/search")
//    public ResponseEntity<List<StudentProfile>> searchStudents(
//            @RequestParam(required = false) String branch,
//            @RequestParam(required = false) Double minCgpa,
//            @RequestParam(required = false) String skills,
//            @RequestParam(required = false) Integer year) {
//        return ResponseEntity.ok(studentProfileService.searchStudents(branch, minCgpa, skills, year));
//    }
//
//    @PostMapping("/shortlist/{studentId}")
//    public ResponseEntity<Void> shortlistStudent(@PathVariable Long studentId, @RequestParam Long recruiterId) {
//        studentProfileService.shortlistStudent(studentId, recruiterId);
//        return ResponseEntity.ok().build();
//    }
//}
