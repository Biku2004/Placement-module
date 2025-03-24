package com.spring.demo.backendplacementcell.controllers;

import com.spring.demo.backendplacementcell.entities.JobApplicationStats;
import com.spring.demo.backendplacementcell.services.JobPostingService;
import com.spring.demo.backendplacementcell.services.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/data")
@CrossOrigin(origins = {"http://localhost:4200", "https://placement-cell-cutm.netlify.app/"})
public class StatsController {

    @Autowired
    private StatsService statsService;

    @GetMapping("/stats")
//    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff','Student')")
    public JobApplicationStats getJobApplicationStats() {
        return statsService.getJobApplicationStats();
    }



}