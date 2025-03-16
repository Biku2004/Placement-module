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
        jobPosting.setStatus("PENDING"); // Ensure new postings start as DRAFT
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
        // Status remains unchanged unless explicitly sent to staff
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

    public JobPosting sendJobPostingToStaff(Long id, String email) {
        JobPosting jobPosting = jobPostingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job posting not found"));
        if (!jobPosting.getCreatedBy().equals(email)) {
            throw new RuntimeException("You can only send your own job postings to staff");
        }
        if (!"DRAFT".equals(jobPosting.getStatus())) {
            throw new RuntimeException("Only draft job postings can be sent to staff");
        }
        jobPosting.setStatus("PENDING");
        return jobPostingRepository.save(jobPosting);
    }

    // New Staff Methods
    public List<JobPosting> getAllJobPostings() {
        return jobPostingRepository.findAll(); // Staff can see all job postings
    }

    public JobPosting approveJobPosting(Long id) {
        JobPosting jobPosting = jobPostingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job posting not found"));
        if (!"PENDING".equals(jobPosting.getStatus())) {
            throw new RuntimeException("Only pending job postings can be approved");
        }
        jobPosting.setStatus("APPROVED");
        return jobPostingRepository.save(jobPosting);
    }

    public JobPosting rejectJobPosting(Long id) {
        JobPosting jobPosting = jobPostingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job posting not found"));
        if (!"PENDING".equals(jobPosting.getStatus())) {
            throw new RuntimeException("Only pending job postings can be rejected");
        }
        jobPosting.setStatus("REJECTED");
        return jobPostingRepository.save(jobPosting);
    }

    public JobPosting sendJobPostingToStudents(Long id) {
        JobPosting jobPosting = jobPostingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job posting not found"));
        if (!"APPROVED".equals(jobPosting.getStatus())) {
            throw new RuntimeException("Only approved job postings can be sent to students");
        }
        jobPosting.setStatus("SENT");
        return jobPostingRepository.save(jobPosting);
        // Add logic here to notify students (e.g., email service) if needed
    }
}