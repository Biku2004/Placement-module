package com.spring.demo.backendplacementcell.services;

// JobPostService.java
import com.spring.demo.backendplacementcell.entities.JobApplication;
import com.spring.demo.backendplacementcell.entities.JobPost;
import com.spring.demo.backendplacementcell.entities.Round;
import com.spring.demo.backendplacementcell.repository.JobPostRepository;
import com.spring.demo.backendplacementcell.repository.JobApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    @Autowired
    private EmailService emailService;


//    public List<JobPost> getJobPostsForUser(String email, String role) {
//        if ("Student".equals(role)) {
//            return jobPostRepository.findAll(); // Students see all job posts
//        } else if ("Recruiter".equals(role)) {
//            return jobPostRepository.findByCreatedBy(email); // Staffs see their own
//        } else if ("Staff".equals(role)) {
//            return jobPostRepository.findByCreatedBy(email); // Staff see all
//        }
//        return List.of(); // Default: empty list
//    }

    public List<JobPost> getJobPostsForUser(String email) {
        return jobPostRepository.findByCreatedBy(email); // Staff see their own posts
    }

//    public JobPost createJobPost(JobPost jobPost, String email, String role) {
//        if (!"Staff".equals(role)) {
//            throw new RuntimeException("Only Staffs can create job posts");
//        }
//        jobPost.setCreatedBy(email);
//        return jobPostRepository.save(jobPost);
//    }

    public JobPost createJobPost(JobPost jobPost, String email) {
        jobPost.setCreatedBy(email);
        jobPost.setStatus("DRAFT");
        return jobPostRepository.save(jobPost);
    }


    public JobPost updateJobPost(Long id, JobPost jobPost) {
        JobPost existing = jobPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job post not found"));
//        if (!existing.getCreatedBy().equals(email)) {
//            throw new RuntimeException("You can only update your own job post");
//        }
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
        existing.setLogo(jobPost.getLogo());
        existing.setCreatedBy(existing.getCreatedBy()); // Preserve creator
        return jobPostRepository.save(existing);
    }


    public void deleteJobPost(Long id) {
        jobPostRepository.deleteById(id);
    }

    public void sendJobPostToStudents(Long id) {
        JobPost jobPost = jobPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job post not found"));
        jobPost.setStatus("SENT");
        jobPostRepository.save(jobPost);
        // Add logic to notify students if needed (e.g., via email)
        System.out.println("Sending job post " + jobPost.getJobRole() + " to students");
    }

    public void applyToJobPost(Long id, String studentEmail) {
        JobPost jobPost = jobPostRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job post not found"));
        if (!"SENT".equals(jobPost.getStatus())) {
            throw new RuntimeException("Can only apply to job posts that are sent to students");
        }
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

    public JobApplication shortlistApplication(Long applicationId) {
        JobApplication application = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        if (!"Applied".equals(application.getStatus())) {
            throw new RuntimeException("Can only shortlist applications in 'Applied' status");
        }
        application.setStatus("Shortlisted");
        return jobApplicationRepository.save(application);
    }

    public JobApplication rejectApplication(Long applicationId) {
        JobApplication application = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        application.setStatus("Rejected");
        application.getRounds().forEach(round -> {
            if (!"Completed".equals(round.getStatus())) {
                round.setStatus("Failed");
                round.setDate(LocalDate.now());
            }
        });
        return jobApplicationRepository.save(application);
    }

    public JobApplication setExamDetails(Long applicationId, String examLink, LocalDateTime testScheduledTime) {
        JobApplication application = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        application.setExamLink(examLink);
        application.setTestScheduledTime(testScheduledTime);
        Round testRound = application.getRounds().stream()
                .filter(r -> "Test".equals(r.getName()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Test round not found"));
        if (!"Opened".equals(testRound.getStatus())) {
            testRound.setStatus("Opened"); // Automatically open the Test round
        }
        return jobApplicationRepository.save(application);
    }

    @Scheduled(fixedRate = 60000) // Check every minute
    public void sendExamLinks() {
        List<JobApplication> applications = jobApplicationRepository.findAll();
        LocalDateTime now = LocalDateTime.now();
        for (JobApplication app : applications) {
            if (app.getTestScheduledTime() != null && now.isAfter(app.getTestScheduledTime()) && app.getExamLink() != null) {
                app.getRounds().stream()
                        .filter(r -> "Test".equals(r.getName()) && "Opened".equals(r.getStatus()))
                        .findFirst()
                        .ifPresent(r -> {
                            emailService.sendExamLink(app.getStudentEmail(), app.getExamLink());
                            app.setTestScheduledTime(null); // Clear after sending
                            jobApplicationRepository.save(app);
                        });
            }
        }
    }

    public JobApplication updateRoundStatus(Long applicationId, String roundName, String newStatus) {
        JobApplication application = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        Round round = application.getRounds().stream()
                .filter(r -> r.getName().equals(roundName))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Round not found"));
        round.setStatus(newStatus);
        if ("Completed".equals(newStatus) || "Failed".equals(newStatus)) {
            round.setDate(LocalDate.now());
        }
        if ("Test".equals(roundName) && "Opened".equals(newStatus)) {
            application.setTestScheduledTime(LocalDateTime.now().plusMinutes(5)); // Schedule 5 minutes from now
            application.setExamLink("https://example.com/exam/" + application.getId()); // Example link
        }
        if ("Interview".equals(roundName) && "Completed".equals(newStatus)) {
            application.getRounds().stream()
                    .filter(r -> "Offer".equals(r.getName()))
                    .findFirst()
                    .ifPresent(r -> r.setStatus("Opened"));
        }
        if ("Offer".equals(roundName) && "Completed".equals(newStatus)) {
            application.setStatus("Offer Received");
        }
        return jobApplicationRepository.save(application);
    }

    public List<JobPost> getApprovedJobPostings() {
        return jobPostRepository.findByStatus("SENT").stream()
                .collect(Collectors.toList());
    }

    public Optional<JobPost> getJobPostingById(Long id) {
        return jobPostRepository.findById(id);
    }



}