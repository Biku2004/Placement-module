package com.spring.demo.backendplacementcell.controllers;


import com.spring.demo.backendplacementcell.entities.JobPosting;
import com.spring.demo.backendplacementcell.services.JobPostingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/recruiter/jobs")
public class JobPostingController {
    @Autowired
    private JobPostingService jobPostingService;

    @PostMapping
    public ResponseEntity<JobPosting> createJob(@RequestPart("job") JobPosting jobPosting,
                                                @RequestPart(value = "pdf", required = false) MultipartFile pdf,
                                                @RequestParam Long recruiterId) throws Exception {
        return ResponseEntity.ok(jobPostingService.createJobPosting(jobPosting, pdf, recruiterId));
    }

    @GetMapping
    public ResponseEntity<List<JobPosting>> getJobs(@RequestParam Long recruiterId) {
        return ResponseEntity.ok(jobPostingService.getJobPostings(recruiterId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobPosting> updateJob(@PathVariable Long id, @RequestBody JobPosting jobPosting) {
        return ResponseEntity.ok(jobPostingService.updateJobPosting(id, jobPosting));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        jobPostingService.deleteJobPosting(id);
        return ResponseEntity.ok().build();
    }
}