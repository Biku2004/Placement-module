//package com.spring.demo.backendplacementcell.controllers;
//
//import com.spring.demo.backendplacementcell.entities.JobPosting;
//import com.spring.demo.backendplacementcell.services.JobPostingService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/student/jobs")
//@CrossOrigin(origins = {"http://localhost:4200", "https://placement-cell-cutm.netlify.app/"})
//public class StudentJobController {
//
//    @Autowired
//    private JobPostingService jobPostingService;
//
//    @GetMapping
//    @PreAuthorize("hasRole('Student')") // Restrict to students only
//    public ResponseEntity<List<JobPosting>> getApprovedJobPostings() {
//        List<JobPosting> approvedJobs = jobPostingService.getApprovedJobPostings();
//        return ResponseEntity.ok(approvedJobs);
//    }
//}