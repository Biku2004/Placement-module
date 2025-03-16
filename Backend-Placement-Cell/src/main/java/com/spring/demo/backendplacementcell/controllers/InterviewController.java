package com.spring.demo.backendplacementcell.controllers;

import com.spring.demo.backendplacementcell.entities.Interview;
import com.spring.demo.backendplacementcell.services.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recruiter/interviews")
public class InterviewController {
    @Autowired
    private InterviewService interviewService;

    @PostMapping
    public ResponseEntity<Interview> scheduleInterview(@RequestBody Interview interview, @RequestParam Long recruiterId) {
        return ResponseEntity.ok(interviewService.scheduleInterview(interview, recruiterId));
    }
}