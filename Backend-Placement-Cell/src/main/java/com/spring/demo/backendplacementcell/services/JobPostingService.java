package com.spring.demo.backendplacementcell.services;

import com.spring.demo.backendplacementcell.entities.JobPosting;
import com.spring.demo.backendplacementcell.repository.JobPostingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobPostingService {

    @Autowired
    private JobPostingRepository jobPostingRepository;

    public List<JobPosting> getJobPostingsForRecruiter(String email) {
        return jobPostingRepository.findByCreatedBy(email);
    }

    public JobPosting createJobPosting(JobPosting jobPosting, String email) {
        jobPosting.setCreatedBy(email);
        return jobPostingRepository.save(jobPosting);
    }

    public JobPosting updateJobPosting(Long id, JobPosting jobPosting, String email) {
        JobPosting existing = jobPostingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job posting not found"));
        if (!existing.getCreatedBy().equals(email)) {
            throw new RuntimeException("You can only update your own job postings");
        }
        existing.setCompanyName(jobPosting.getCompanyName());
        existing.setWebsite(jobPosting.getWebsite());
        existing.setCompanyProfile(jobPosting.getCompanyProfile());
        existing.setEligibleCourses(jobPosting.getEligibleCourses());
        existing.setBatchYear(jobPosting.getBatchYear());
        existing.setJobRole(jobPosting.getJobRole());
        existing.setJobLocation(jobPosting.getJobLocation());
        existing.setAnnualCTC(jobPosting.getAnnualCTC());
        existing.setRolesResponsibilities(jobPosting.getRolesResponsibilities());
        existing.setSkillsQualifications(jobPosting.getSkillsQualifications());
        existing.setSelectionProcess(jobPosting.getSelectionProcess());
        existing.setRegistrationProcess(jobPosting.getRegistrationProcess());
        existing.setLastDateToRegister(jobPosting.getLastDateToRegister());
        existing.setBenefitsIncentives(jobPosting.getBenefitsIncentives());
        existing.setRoleDetails(jobPosting.getRoleDetails());
        existing.setExpectedSkillsTools(jobPosting.getExpectedSkillsTools());
        existing.setAdditionalSections(jobPosting.getAdditionalSections());
        existing.setCreatedBy(existing.getCreatedBy()); // Preserve creator
        return jobPostingRepository.save(existing);
    }

    public void deleteJobPosting(Long id, String email) {
        JobPosting existing = jobPostingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job posting not found"));
        if (!existing.getCreatedBy().equals(email)) {
            throw new RuntimeException("You can only delete your own job postings");
        }
        jobPostingRepository.deleteById(id);
    }
}