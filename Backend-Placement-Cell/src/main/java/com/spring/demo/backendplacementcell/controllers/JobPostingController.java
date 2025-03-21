package com.spring.demo.backendplacementcell.controllers;

import com.spring.demo.backendplacementcell.entities.JobApplication;
import com.spring.demo.backendplacementcell.entities.JobPosting;
import com.spring.demo.backendplacementcell.services.JobPostingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff','Student')")
    public List<JobPosting> getJobPostings(Principal principal) {
        return jobPostingService.getJobPostingsForRecruiter(principal.getName());
    }

    @GetMapping("/staff")
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff','Student')")
    public List<JobPosting> getAllJobPostings(Principal principal) {
        return jobPostingService.getAllJobPostings(principal.getName());
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff')")
    public JobPosting createJobPosting(@RequestBody JobPosting jobPosting, Principal principal) {
        return jobPostingService.createJobPosting(jobPosting, principal.getName());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff')")
    public JobPosting updateJobPosting(@PathVariable Long id, @RequestBody JobPosting jobPosting, Principal principal) {
        return jobPostingService.updateJobPosting(id, jobPosting, principal.getName());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff')")
    public void deleteJobPosting(@PathVariable Long id, Principal principal) {
        jobPostingService.deleteJobPosting(id, principal.getName());
    }

    @PostMapping("/{id}/send-to-staff")
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff')")
    public JobPosting sendJobPostingToStaff(@PathVariable Long id, Principal principal) {
        return jobPostingService.sendJobPostingToStaff(id, principal.getName());
    }


    @PutMapping("/{id}/approve")
    @PreAuthorize("hasAuthority('Staff')")
    public JobPosting approveJobPosting(@PathVariable Long id) {
        return jobPostingService.approveJobPosting(id);
    }

    @PutMapping("/{id}/reject")
    @PreAuthorize("hasAuthority('Staff')")
    public JobPosting rejectJobPosting(@PathVariable Long id) {
        return jobPostingService.rejectJobPosting(id);
    }

    @PostMapping("/{id}/send-to-students")
    @PreAuthorize("hasAuthority('Staff')")
    public JobPosting sendJobPostingToStudents(@PathVariable Long id) {
        return jobPostingService.sendJobPostingToStudents(id);
    }


    // New endpoints for student applications
    @PostMapping("/{id}/apply")
    @PreAuthorize("hasAuthority('Student')")
    public void applyToJobPosting(@PathVariable Long id, Principal principal) {
        jobPostingService.applyToJobPosting(id, principal.getName());
    }

    @GetMapping("/my-applications")
    @PreAuthorize("hasAuthority('Student')")
    public List<JobApplication> getMyApplications(Principal principal) {
        return jobPostingService.getApplicationsForStudent(principal.getName());
    }

//    @GetMapping("/{id}/applications")
//    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff')")
//    public List<JobApplication> getJobPostingApplications(@PathVariable Long id, Principal principal) {
//        JobPosting jobPosting = jobPostingService.getJobPostingsForRecruiter(principal.getName()).stream()
//                .filter(jp -> jp.getId().equals(id))
//                .findFirst()
//                .orElseThrow(() -> new RuntimeException("Job posting not found or you don’t have permission"));
//        return jobPostingService.getApplicationsForJobPosting(id);
//    }

    @GetMapping("/{id}/applications")
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff')")
    public List<JobApplication> getJobPostingApplications(@PathVariable Long id, Principal principal) {
        System.out.println("Principal: " + principal.getName()); // Debug
        // Check if job exists, no creator restriction
        JobPosting jobPosting = jobPostingService.getJobPostingById(id)
                .orElseThrow(() -> new RuntimeException("Job posting not found"));
        return jobPostingService.getApplicationsForJobPosting(id);
    }


    @GetMapping("/student/jobs")
    @PreAuthorize("hasAnyAuthority('Student')")
    public ResponseEntity<List<JobPosting>> getApprovedJobPostings() {
        List<JobPosting> approvedJobs = jobPostingService.getApprovedJobPostings();
        return ResponseEntity.ok(approvedJobs);
    }
}