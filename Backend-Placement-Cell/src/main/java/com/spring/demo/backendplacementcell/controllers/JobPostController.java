package com.spring.demo.backendplacementcell.controllers;

import com.spring.demo.backendplacementcell.entities.JobApplication;
import com.spring.demo.backendplacementcell.entities.JobPost;
import com.spring.demo.backendplacementcell.services.JobPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;


//@RestController
//@RequestMapping("/api/jobs")
//@CrossOrigin(origins = {"http://localhost:4200","https://placement-cell-cutm.netlify.app/"})
//public class JobPostController {
//    @Autowired
//    private JobPostService jobPostService;
//
//    @GetMapping
//    public List<JobPost> getAllJobPosts() {
//        return jobPostService.getAllJobPosts();
//    }
//
//    @PostMapping
//    public JobPost createJobPost(@RequestBody JobPost jobPost) {
//        return jobPostService.createJobPost(jobPost);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteJobPost(@PathVariable Long id) {
//        jobPostService.deleteJobPost(id);
//    }
//
//    @PutMapping("/{id}")
//    public JobPost updateJobPost(@PathVariable Long id, @RequestBody JobPost jobPost) {
//        return jobPostService.updateJobPost(id, jobPost);
//    }
//
//    @PostMapping("/{id}/send")
//    public void sendJobPostToStudents(@PathVariable Long id) {
//        jobPostService.sendJobPostToStudents(id);
//    }
//}
//For Staff
@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = {"http://localhost:4200","https://placement-cell-cutm.netlify.app/"})
public class JobPostController {

    @Autowired
    private JobPostService jobPostService;

    @GetMapping
    public List<JobPost> getJobPosts(Principal principal, Authentication authentication) {
        String role = authentication.getAuthorities().iterator().next().getAuthority();
        return jobPostService.getJobPostsForUser(principal.getName(), role);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('Recruiter')") // Only Recruiters can create
    public JobPost createJobPost(@RequestBody JobPost jobPost, Principal principal) {
        return jobPostService.createJobPost(jobPost, principal.getName(), "Recruiter");
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff')") // Recruiters and Staff can update
    public JobPost updateJobPost(@PathVariable Long id, @RequestBody JobPost jobPost,
                                 Principal principal, Authentication authentication) {
        String role = authentication.getAuthorities().iterator().next().getAuthority();
        return jobPostService.updateJobPost(id, jobPost, principal.getName(), role);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff')") // Recruiters and Staff can delete
    public void deleteJobPost(@PathVariable Long id, Principal principal, Authentication authentication) {
        String role = authentication.getAuthorities().iterator().next().getAuthority();
        jobPostService.deleteJobPost(id, principal.getName(), role);
    }

    @PostMapping("/{id}/send")
    @PreAuthorize("hasAuthority('Staff')") // Only Staff can send job posts to students
    public void sendJobPostToStudents(@PathVariable Long id, Principal principal) {
        jobPostService.sendJobPostToStudents(id); // Staff can send any job post
    }

    @PostMapping("/{id}/apply")
    @PreAuthorize("hasAuthority('Student')") // Only Students can apply
    public void applyToJobPost(@PathVariable Long id, Principal principal) {
        jobPostService.applyToJobPost(id, principal.getName()); // New method for applying
    }
//    -------------------------------

    @GetMapping("/my-applications")
    @PreAuthorize("hasAuthority('Student')")
    public List<JobApplication> getMyApplications(Principal principal) {
        return jobPostService.getApplicationsForStudent(principal.getName());
    }

    @GetMapping("/{id}/applications")
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff')")
    public List<JobApplication> getJobPostApplications(@PathVariable Long id,
                                                       Principal principal, Authentication authentication) {
        String role = authentication.getAuthorities().iterator().next().getAuthority();
        if ("Recruiter".equals(role)) {
            JobPost jobPost = jobPostService.getJobPostsForUser(principal.getName(), role).stream()
                    .filter(jp -> jp.getId().equals(id))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Job post not found or you don’t have permission"));
        }
        return jobPostService.getApplicationsForJobPost(id);
    }

}