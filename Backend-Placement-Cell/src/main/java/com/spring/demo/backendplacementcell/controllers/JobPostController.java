package com.spring.demo.backendplacementcell.controllers;

// JobPostController.java
import com.spring.demo.backendplacementcell.entities.JobPost;
import com.spring.demo.backendplacementcell.services.JobPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = {"http://localhost:4200","https://placement-cell-cutm.netlify.app/"})
public class JobPostController {
    @Autowired
    private JobPostService jobPostService;

    @GetMapping
    public List<JobPost> getAllJobPosts() {
        return jobPostService.getAllJobPosts();
    }

    @PostMapping
    public JobPost createJobPost(@RequestBody JobPost jobPost) {
        return jobPostService.createJobPost(jobPost);
    }

    @DeleteMapping("/{id}")
    public void deleteJobPost(@PathVariable Long id) {
        jobPostService.deleteJobPost(id);
    }

    @PutMapping("/{id}")
    public JobPost updateJobPost(@PathVariable Long id, @RequestBody JobPost jobPost) {
        return jobPostService.updateJobPost(id, jobPost);
    }

    @PostMapping("/{id}/send")
    public void sendJobPostToStudents(@PathVariable Long id) {
        jobPostService.sendJobPostToStudents(id);
    }
}