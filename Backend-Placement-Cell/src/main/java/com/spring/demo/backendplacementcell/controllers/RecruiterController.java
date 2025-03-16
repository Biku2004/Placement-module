//package com.spring.demo.backendplacementcell.controllers;
//
//
//import com.spring.demo.backendplacementcell.entities.Recruiter;
//import com.spring.demo.backendplacementcell.services.RecruiterService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/recruiter")
//public class RecruiterController {
//    @Autowired
//    private RecruiterService recruiterService;
//
//    @PostMapping("/register")
//    public ResponseEntity<Recruiter> register(@RequestBody Recruiter recruiter) {
//        return ResponseEntity.ok(recruiterService.registerRecruiter(recruiter));
//    }
//
//    @GetMapping("/verify")
//    public ResponseEntity<String> verifyEmail(@RequestParam String email) {
//        recruiterService.verifyEmail(email);
//        return ResponseEntity.ok("Email verified successfully");
//    }
//}