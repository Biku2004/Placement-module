package com.spring.demo.backendplacementcell.services;

// JobPostService.java
import com.spring.demo.backendplacementcell.entities.JobPost;
import com.spring.demo.backendplacementcell.repository.JobPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobPostService {
    @Autowired
    private JobPostRepository jobPostRepository;

    public List<JobPost> getAllJobPosts() {
        return jobPostRepository.findAll();
    }

    public JobPost createJobPost(JobPost jobPost) {
        return jobPostRepository.save(jobPost);
    }

    public void deleteJobPost(Long id) {
        jobPostRepository.deleteById(id);
    }

    public JobPost updateJobPost(Long id, JobPost jobPost) {
        JobPost existingJobPost = jobPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job post not found"));
        existingJobPost.setCompanyName(jobPost.getCompanyName());
        existingJobPost.setWebsite(jobPost.getWebsite());
        existingJobPost.setCompanyProfile(jobPost.getCompanyProfile());
        existingJobPost.setEligibleCourses(jobPost.getEligibleCourses());
        existingJobPost.setBatchYear(jobPost.getBatchYear());
        existingJobPost.setJobRole(jobPost.getJobRole());
        existingJobPost.setJobLocation(jobPost.getJobLocation());
        existingJobPost.setAnnualCTC(jobPost.getAnnualCTC());
        existingJobPost.setRolesResponsibilities(jobPost.getRolesResponsibilities());
        existingJobPost.setSkillsQualifications(jobPost.getSkillsQualifications());
        existingJobPost.setSelectionProcess(jobPost.getSelectionProcess());
        existingJobPost.setRegistrationProcess(jobPost.getRegistrationProcess());
        existingJobPost.setLastDateToRegister(jobPost.getLastDateToRegister());
        existingJobPost.setBenefitsIncentives(jobPost.getBenefitsIncentives());
        existingJobPost.setRoleDetails(jobPost.getRoleDetails());
        existingJobPost.setExpectedSkillsTools(jobPost.getExpectedSkillsTools());
        existingJobPost.setAdditionalSections(jobPost.getAdditionalSections());
        return jobPostRepository.save(existingJobPost);
    }

    public void sendJobPostToStudents(Long id) {
        // Implement logic to send job post to students
    }
}