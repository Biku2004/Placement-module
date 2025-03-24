package com.spring.demo.backendplacementcell.services;

import com.spring.demo.backendplacementcell.entities.JobApplication;
import com.spring.demo.backendplacementcell.entities.JobApplicationStats;
import com.spring.demo.backendplacementcell.entities.JobPosting;
import com.spring.demo.backendplacementcell.entities.Round;
import com.spring.demo.backendplacementcell.repository.JobApplicationRepository;
import com.spring.demo.backendplacementcell.repository.JobPostingRepository;
import jakarta.transaction.Transactional;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JobPostingService {

    @Autowired
    private JobPostingRepository jobPostingRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;


    @Autowired
    private EmailService emailService;

    public List<JobPosting> getJobPostingsForRecruiter(String email) {
        return jobPostingRepository.findByCreatedBy(email);
    }


    public JobPosting createJobPosting(JobPosting jobPosting, String email) {
        jobPosting.setCreatedBy(email);
        jobPosting.setStatus("DRAFT"); // Ensure new postings start as DRAFT
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
        existing.setLogo(jobPosting.getLogo());
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
    public List<JobPosting> getAllJobPostings(String name) {
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

    // New methods for student applications
    public void applyToJobPosting(Long id, String studentEmail) {
        JobPosting jobPosting = jobPostingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job posting not found"));
        if (!"SENT".equals(jobPosting.getStatus())) {
            throw new RuntimeException("You can only apply to job postings that have been sent to students");
        }
        if (jobApplicationRepository.existsByStudentEmailAndJobPostId(studentEmail, id)) {
            throw new RuntimeException("You have already applied to this job posting");
        }
        JobApplication application = new JobApplication(studentEmail, id, "Applied");
        application.setCompanyName(jobPosting.getCompanyName()); // Set company name
        application.setJobRole(jobPosting.getJobRole());         // Set job role
        application.setLogo(jobPosting.getLogo()); // Copy logo to application

        if (application.getApplicationDate() == null) { // Fallback for safety
            application.setApplicationDate(LocalDate.now());
        }

        jobApplicationRepository.save(application);
        System.out.println("Student " + studentEmail + " applied to job posting " + jobPosting.getJobRole());
    }

    public List<JobApplication> getApplicationsForStudent(String studentEmail) {
        return jobApplicationRepository.findByStudentEmail(studentEmail);
    }

    public List<JobApplication> getApplicationsForJobPosting(Long jobPostingId) {
        return jobApplicationRepository.findByJobPostId(jobPostingId);
    }

    // New method for students to view approved (SENT) job postings
//    public List<JobPosting> getApprovedJobPostings() {
//        return jobPostingRepository.findByStatus("SENT");
//    }

    public List<JobPosting> getApprovedJobPostings() {
        return jobPostingRepository.findByStatus("SENT").stream()
                .filter(jp -> !jp.isHidden()) // Students only see non-hidden SENT jobs
                .collect(Collectors.toList());
    }





    public Optional<JobPosting> getJobPostingById(Long id) {
        return jobPostingRepository.findById(id);
    }

    // Add to JobPostingService
    public void deregisterFromJobPosting(Long id, String studentEmail) {
        JobApplication application = jobApplicationRepository.findByStudentEmailAndJobPostId(studentEmail, id)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        if (!"Applied".equals(application.getStatus())) {
            throw new RuntimeException("You can only deregister from an application that is still 'Applied'");
        }
        jobApplicationRepository.delete(application);
    }

    // Add to JobPostingService
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

    public JobApplication shortlistApplication(Long applicationId) {
        JobApplication application = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        if (!"Applied".equals(application.getStatus())) {
            throw new RuntimeException("Can only shortlist applications in 'Applied' status");
        }
        application.setStatus("Shortlisted");
        application.getRounds().stream()
                .filter(r -> "Screening".equals(r.getName()))
                .findFirst()
                .ifPresent(r -> {
                    r.setStatus("Completed");
                    r.setDate(LocalDate.now());
                });
        return jobApplicationRepository.save(application);
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

//    @Scheduled(fixedRate = 60000) // Check every minute
//    public void sendExamLinks() {
//        List<JobApplication> applications = jobApplicationRepository.findAll();
//        LocalDateTime now = LocalDateTime.now();
//        for (JobApplication app : applications) {
//            if (app.getTestScheduledTime() != null && now.isAfter(app.getTestScheduledTime()) && app.getExamLink() != null) {
//                app.getRounds().stream()
//                        .filter(r -> "Test".equals(r.getName()) && "Opened".equals(r.getStatus()))
//                        .findFirst()
//                        .ifPresent(r -> {
//                            emailService.sendExamLink(app.getStudentEmail(), app.getExamLink());
//                            app.setTestScheduledTime(null); // Clear after sending
//                            jobApplicationRepository.save(app);
//                        });
//                System.out.println("Sent exam link to " + app.getStudentEmail());
//            }
//        }
//    }

    public List<JobApplication> bulkRejectApplications(List<Long> applicationIds) {
        List<JobApplication> applications = jobApplicationRepository.findAllById(applicationIds);
        applications.forEach(app -> {
            app.setStatus("Rejected");
            app.getRounds().forEach(r -> {
                if (!"Completed".equals(r.getStatus())) {
                    r.setStatus("Failed");
                    r.setDate(LocalDate.now());
                }
            });
        });
        return jobApplicationRepository.saveAll(applications);
    }

    public List<JobApplication> bulkShortlistApplications(List<Long> applicationIds) {
        List<JobApplication> applications = jobApplicationRepository.findAllById(applicationIds);
        applications.forEach(app -> {
            if ("Applied".equals(app.getStatus())) {
                app.setStatus("Shortlisted");
                app.getRounds().stream()
                        .filter(r -> "Screening".equals(r.getName()))
                        .findFirst()
                        .ifPresent(r -> {
                            r.setStatus("Completed");
                            r.setDate(LocalDate.now());
                        });
            }
        });
        return jobApplicationRepository.saveAll(applications);
    }


    // JobPostingService.java
//    public JobApplication setExamDetails(Long applicationId, String examLink, LocalDateTime testScheduledTime) {
//        JobApplication application = jobApplicationRepository.findById(applicationId)
//                .orElseThrow(() -> new RuntimeException("Application not found"));
//        application.setExamLink(examLink);
//        application.setTestScheduledTime(testScheduledTime);
//        Round testRound = application.getRounds().stream()
//                .filter(r -> "Test".equals(r.getName()))
//                .findFirst()
//                .orElseThrow(() -> new RuntimeException("Test round not found"));
//        if (!"Opened".equals(testRound.getStatus())) {
//            testRound.setStatus("Opened"); // Automatically open the Test round
//        }
//        return jobApplicationRepository.save(application);
//    }

    @Transactional
    public JobApplication setExamDetails(Long applicationId, String examLink, LocalDateTime testScheduledTime) {
        System.out.println("Setting exam details for application " + applicationId + ": ScheduledTime=" + testScheduledTime + ", Link=" + examLink);
        JobApplication application = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        application.setExamLink(examLink);
        application.setTestScheduledTime(testScheduledTime);
        Round testRound = application.getRounds().stream()
                .filter(r -> "Test".equals(r.getName()))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Test round not found"));
        if (!"Opened".equals(testRound.getStatus())) {
            testRound.setStatus("Opened");
        }
        JobApplication saved = jobApplicationRepository.saveAndFlush(application); // Force flush to DB
        System.out.println("Saved application " + saved.getId() + ": ScheduledTime=" + saved.getTestScheduledTime() + ", Link=" + saved.getExamLink());
        return saved;
    }

    @Scheduled(fixedRate = 60000)
    @Transactional
    public void sendExamLinks() {
        List<JobApplication> applications = jobApplicationRepository.findAll();
        LocalDateTime now = LocalDateTime.now();
        System.out.println("Running sendExamLinks at " + now + ", found " + applications.size() + " applications");
        for (JobApplication app : applications) {
            Hibernate.initialize(app.getRounds());
            System.out.println("Loaded application " + app.getId() + " for " + app.getStudentEmail() +
                    ": ScheduledTime=" + app.getTestScheduledTime() +
                    ", Link=" + app.getExamLink());
            if (app.getTestScheduledTime() != null && now.isAfter(app.getTestScheduledTime()) && app.getExamLink() != null) {
                app.getRounds().stream()
                        .filter(r -> "Test".equals(r.getName()) && "Opened".equals(r.getStatus()))
                        .findFirst()
                        .ifPresent(r -> {
                            try {
                                System.out.println("Sending exam link to " + app.getStudentEmail() +
                                        " for " + app.getExamLink() +
                                        " scheduled at " + app.getTestScheduledTime());
                                emailService.sendExamLink(app.getStudentEmail(), app.getExamLink());
                                System.out.println("Exam link successfully sent to " + app.getStudentEmail());
                                app.setTestScheduledTime(null);
                                jobApplicationRepository.save(app);
                            } catch (Exception e) {
                                System.err.println("Failed to send exam link to " + app.getStudentEmail() + ": " + e.getMessage());
                            }
                        });
            } else {
                System.out.println("No email sent for " + app.getStudentEmail() +
                        ": ScheduledTime=" + app.getTestScheduledTime() +
                        ", Link=" + app.getExamLink());
            }
        }
    }


    public JobPosting hideJobPosting(Long id, String email) {
        JobPosting jobPosting = jobPostingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job posting not found"));
        if (!email.equals(jobPosting.getCreatedBy())) {
            throw new RuntimeException("Only the recruiter who created it or staff can hide this job posting");
        }
        jobPosting.setHidden(true); // Hidden from students only
        return jobPostingRepository.save(jobPosting);
    }

    public JobPosting unhideJobPosting(Long id, String email) {
        JobPosting jobPosting = jobPostingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job posting not found"));
        if (!email.equals(jobPosting.getCreatedBy())) {
            throw new RuntimeException("Only the recruiter who created it or staff can unhide this job posting");
        }
        jobPosting.setHidden(false); // Make visible to students again
        return jobPostingRepository.save(jobPosting);
    }


//    @Scheduled(cron = "0 0 0 1 1 *") // Runs every January 1st at midnight
//    public void autoArchiveJobPostings() {
//        LocalDate now = LocalDate.now();
//        List<JobPosting> jobPostings = jobPostingRepository.findByIsHiddenFalse();
//        for (JobPosting jp : jobPostings) {
//            String[] years = jp.getBatchYear().split("-");
//            int endYear = Integer.parseInt("20" + years[1]); // Assuming "22-26" format
//            if (now.getYear() > endYear) {
//                jp.setHidden(true);
//                jp.setArchiveYear("Year " + jp.getBatchYear());
//                jobPostingRepository.save(jp);
//            }
//        }
//    }

//    Getting the Card (Staff) Details :

//    public JobApplicationStats getJobApplicationStats() {
//        List<JobApplication> applications = jobApplicationRepository.findAll();
//        int totalApplications = applications.size();
//        long interviewsAttended = applications.stream()
//                .filter(app -> app.getRounds().stream()
//                        .anyMatch(r -> "Interview".equals(r.getName()) &&
//                                ("Completed".equals(r.getStatus()) || "Opened".equals(r.getStatus()))))
//                .count();
//        int interviewPercentage = totalApplications > 0 ? (int) ((interviewsAttended * 100) / totalApplications) : 0;
//        long offersReceived = applications.stream()
//                .filter(app -> "Offer Received".equals(app.getStatus()))
//                .count();
//        long rejectedOffers = applications.stream()
//                .filter(app -> app.getRounds().stream()
//                        .anyMatch(r -> "Offer".equals(r.getName()) && "Failed".equals(r.getStatus())))
//                .count();
//        System.out.println("Returning stats: totalApplications=" + totalApplications +
//                ", interviewsAttended=" + interviewsAttended +
//                ", interviewPercentage=" + interviewPercentage +
//                ", offersReceived=" + offersReceived +
//                ", rejectedOffers=" + rejectedOffers); // Debug log
//        return new JobApplicationStats(totalApplications, interviewsAttended, interviewPercentage, offersReceived, rejectedOffers);
//    }





}