package com.spring.demo.backendplacementcell.controllers;
//recruiter can create, update, delete job postings
import com.spring.demo.backendplacementcell.entities.JobPosting;
import com.spring.demo.backendplacementcell.services.JobPostingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/recruiter/jobs")
@CrossOrigin(origins = {"http://localhost:4200", "https://placement-cell-cutm.netlify.app/"})
public class JobPostingController {

    @Autowired
    private JobPostingService jobPostingService;

    @GetMapping
    @PreAuthorize("hasAuthority('Recruiter')")
    public List<JobPosting> getJobPostings(Principal principal) {
        return jobPostingService.getJobPostingsForRecruiter(principal.getName());
    }

    @PostMapping
    @PreAuthorize("hasAuthority('Recruiter')")
    public JobPosting createJobPosting(@RequestBody JobPosting jobPosting, Principal principal) {
        return jobPostingService.createJobPosting(jobPosting, principal.getName());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('Recruiter')")
    public JobPosting updateJobPosting(@PathVariable Long id, @RequestBody JobPosting jobPosting, Principal principal) {
        return jobPostingService.updateJobPosting(id, jobPosting, principal.getName());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('Recruiter')")
    public void deleteJobPosting(@PathVariable Long id, Principal principal) {
        jobPostingService.deleteJobPosting(id, principal.getName());
    }
}