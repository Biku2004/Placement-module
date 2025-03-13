package com.spring.demo.backendplacementcell.services;

// JobPostService.java
import com.spring.demo.backendplacementcell.entities.JobApplication;
import com.spring.demo.backendplacementcell.entities.JobPost;
import com.spring.demo.backendplacementcell.repository.JobPostRepository;
import com.spring.demo.backendplacementcell.repository.JobApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

//@Service
//public class JobPostService {
//    @Autowired
//    private JobPostRepository jobPostRepository;
//
//    public List<JobPost> getAllJobPosts() {
//        return jobPostRepository.findAll();
//    }
//
//    public JobPost createJobPost(JobPost jobPost) {
//        return jobPostRepository.save(jobPost);
//    }
//
//    public void deleteJobPost(Long id) {
//        jobPostRepository.deleteById(id);
//    }
//
//    public JobPost updateJobPost(Long id, JobPost jobPost) {
//        JobPost existingJobPost = jobPostRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Job post not found"));
//        existingJobPost.setCompanyName(jobPost.getCompanyName());
//        existingJobPost.setWebsite(jobPost.getWebsite());
//        existingJobPost.setCompanyProfile(jobPost.getCompanyProfile());
//        existingJobPost.setEligibleCourses(jobPost.getEligibleCourses());
//        existingJobPost.setBatchYear(jobPost.getBatchYear());
//        existingJobPost.setJobRole(jobPost.getJobRole());
//        existingJobPost.setJobLocation(jobPost.getJobLocation());
//        existingJobPost.setAnnualCTC(jobPost.getAnnualCTC());
//        existingJobPost.setRolesResponsibilities(jobPost.getRolesResponsibilities());
//        existingJobPost.setSkillsQualifications(jobPost.getSkillsQualifications());
//        existingJobPost.setSelectionProcess(jobPost.getSelectionProcess());
//        existingJobPost.setRegistrationProcess(jobPost.getRegistrationProcess());
//        existingJobPost.setLastDateToRegister(jobPost.getLastDateToRegister());
//        existingJobPost.setBenefitsIncentives(jobPost.getBenefitsIncentives());
//        existingJobPost.setRoleDetails(jobPost.getRoleDetails());
//        existingJobPost.setExpectedSkillsTools(jobPost.getExpectedSkillsTools());
//        existingJobPost.setAdditionalSections(jobPost.getAdditionalSections());
//        return jobPostRepository.save(existingJobPost);
//    }
//
//    public void sendJobPostToStudents(Long id) {
//        // Implement logic to send job post to students
//    }
//}

@Service
public class JobPostService {
    @Autowired
    private JobPostRepository jobPostRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    public List<JobPost> getJobPostsForUser(String email, String role) {
        if ("Student".equals(role)) {
            return jobPostRepository.findAll(); // Students see all job posts
        } else if ("Recruiter".equals(role)) {
            return jobPostRepository.findByCreatedBy(email); // Recruiters see their own
        } else if ("Staff".equals(role)) {
            return jobPostRepository.findAll(); // Staff see all
        }
        return List.of(); // Default: empty list
    }

    public JobPost createJobPost(JobPost jobPost, String email, String role) {
        if (!"Recruiter".equals(role)) {
            throw new RuntimeException("Only Recruiters can create job posts");
        }
        jobPost.setCreatedBy(email);
        return jobPostRepository.save(jobPost);
    }

    public JobPost updateJobPost(Long id, JobPost jobPost, String email, String role) {
        JobPost existing = jobPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job post not found"));
        if ("Recruiter".equals(role) && !existing.getCreatedBy().equals(email)) {
            throw new RuntimeException("You can only update your own job posts");
        } else if (!"Recruiter".equals(role) && !"Staff".equals(role)) {
            throw new RuntimeException("You do not have permission to update job posts");
        }
        existing.setCompanyName(jobPost.getCompanyName());
        existing.setWebsite(jobPost.getWebsite());
        existing.setCompanyProfile(jobPost.getCompanyProfile());
        existing.setEligibleCourses(jobPost.getEligibleCourses());
        existing.setBatchYear(jobPost.getBatchYear());
        existing.setJobRole(jobPost.getJobRole());
        existing.setJobLocation(jobPost.getJobLocation());
        existing.setAnnualCTC(jobPost.getAnnualCTC());
        existing.setRolesResponsibilities(jobPost.getRolesResponsibilities());
        existing.setSkillsQualifications(jobPost.getSkillsQualifications());
        existing.setSelectionProcess(jobPost.getSelectionProcess());
        existing.setRegistrationProcess(jobPost.getRegistrationProcess());
        existing.setLastDateToRegister(jobPost.getLastDateToRegister());
        existing.setBenefitsIncentives(jobPost.getBenefitsIncentives());
        existing.setRoleDetails(jobPost.getRoleDetails());
        existing.setExpectedSkillsTools(jobPost.getExpectedSkillsTools());
        existing.setAdditionalSections(jobPost.getAdditionalSections());
        existing.setCreatedBy(existing.getCreatedBy()); // Preserve creator
        return jobPostRepository.save(existing);
    }

    public void deleteJobPost(Long id, String email, String role) {
        JobPost existing = jobPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job post not found"));
        if ("Recruiter".equals(role) && !existing.getCreatedBy().equals(email)) {
            throw new RuntimeException("You can only delete your own job posts");
        } else if (!"Recruiter".equals(role) && !"Staff".equals(role)) {
            throw new RuntimeException("You do not have permission to delete job posts");
        }
        jobPostRepository.deleteById(id);
    }

    public void sendJobPostToStudents(Long id) {
        JobPost jobPost = jobPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job post not found"));
        // Placeholder for sending logic (e.g., email or notification)
        System.out.println("Sending job post " + jobPost.getJobRole() + " to students");
    }

    public void applyToJobPost(Long id, String studentEmail) {
        JobPost jobPost = jobPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job post not found"));
        if (jobApplicationRepository.existsByStudentEmailAndJobPostId(studentEmail, id)) {
            throw new RuntimeException("You have already applied to this job post");
        }
        JobApplication application = new JobApplication(studentEmail, id, "Applied");
        jobApplicationRepository.save(application);
        System.out.println("Student " + studentEmail + " applied to job post " + jobPost.getJobRole());
    }

    public List<JobApplication> getApplicationsForStudent(String studentEmail) {
        return jobApplicationRepository.findByStudentEmail(studentEmail);
    }

    public List<JobApplication> getApplicationsForJobPost(Long jobPostId) {
        return jobApplicationRepository.findByJobPostId(jobPostId);
    }
}