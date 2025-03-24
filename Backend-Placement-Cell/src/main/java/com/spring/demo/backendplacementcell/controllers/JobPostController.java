package com.spring.demo.backendplacementcell.controllers;

import com.spring.demo.backendplacementcell.entities.JobApplication;
import com.spring.demo.backendplacementcell.entities.JobPost;
import com.spring.demo.backendplacementcell.entities.JobPosting;
import com.spring.demo.backendplacementcell.repository.JobApplicationRepository;
import com.spring.demo.backendplacementcell.repository.JobPostRepository;
import com.spring.demo.backendplacementcell.services.EmailService;
import com.spring.demo.backendplacementcell.services.JobPostService;
import jakarta.transaction.Transactional;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


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

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private EmailService emailService;
    @Autowired
    private JobPostRepository jobPostRepository;

    @GetMapping("/staff/created/jobs")
    @PreAuthorize("hasAnyAuthority('Staff', 'Student','Recruiter')")
    public List<JobPost> getJobPosts(Principal principal) {
        return jobPostService.getJobPostsForUser(principal.getName());
    }


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAuthority('Staff')")
    public JobPost createJobPost(
            @RequestPart("jobPost") JobPost jobPost,
            @RequestPart(value = "logo", required = false) MultipartFile logo,
            Principal principal) throws IOException {
        if (logo != null && !logo.isEmpty()) {
            jobPost.setLogo(logo.getBytes());
        }
        return jobPostService.createJobPost(jobPost, principal.getName());
    }


//    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    @PreAuthorize("hasAnyAuthority('Student','Staff','Recruiter')")
//    public JobPost updateJobPost(
//            @PathVariable Long id,
//            @RequestPart("jobPost") JobPost jobPost,
//            @RequestPart(value = "logo", required = false) MultipartFile logo
//            ) throws IOException {
//        if (logo != null && !logo.isEmpty()) {
//            jobPost.setLogo(logo.getBytes());
//        }
//        return jobPostService.updateJobPost(id, jobPost);
//    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('Student','Staff','Recruiter')")
    public JobPost updateJobPost(@PathVariable Long id, @RequestBody JobPost jobPost) {
        return jobPostService.updateJobPost(id, jobPost);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('Staff')")
    public void deleteJobPost(@PathVariable Long id) {
        jobPostService.deleteJobPost(id);
    }

    @PostMapping("/{id}/send-to-students")
    @PreAuthorize("hasAuthority('Staff')")
    public void sendJobPostToStudents(@PathVariable Long id) {
        jobPostService.sendJobPostToStudents(id);
    }


    @PostMapping("/{id}/apply")
    @PreAuthorize("hasAuthority('Student')")
    public void applyToJobPost(@PathVariable Long id, Principal principal) {
        jobPostService.applyToJobPost(id, principal.getName());
    }

    @GetMapping("/my-applications")
    @PreAuthorize("hasAuthority('Student')")
    public List<JobApplication> getMyApplications(Principal principal) {
        return jobPostService.getApplicationsForStudent(principal.getName());
    }

//    @GetMapping("/{id}/applications")
//    @PreAuthorize("hasAuthority('Staff')")
//    public List<JobApplication> getJobPostApplications(@PathVariable Long id) {
//        return jobPostService.getApplicationsForJobPost(id);
//    }


    @PutMapping("/applications/{applicationId}/shortlist")
    @PreAuthorize("hasAuthority('Staff')")
    public JobApplication shortlistApplication(@PathVariable Long applicationId) {
        return jobPostService.shortlistApplication(applicationId);
    }

    @PutMapping("/applications/{applicationId}/reject")
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff')")
    public JobApplication rejectApplication(@PathVariable Long applicationId) {
        return jobPostService.rejectApplication(applicationId);
    }

    @GetMapping("/staff/approved/jobs")
    @PreAuthorize("hasAnyAuthority('Student','Staff','Recruiter')")
    public ResponseEntity<List<JobPost>> getApprovedJobPostings() {
        List<JobPost> approvedJobs = jobPostService.getApprovedJobPostings();
        return ResponseEntity.ok(approvedJobs);
    }

    @GetMapping("/{id}/applications")
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff')")
    public List<JobApplication> getJobPostingApplications(@PathVariable Long id, Principal principal) {
        System.out.println("Principal: " + principal.getName()); // Debug
        // Check if job exists, no creator restriction
        JobPost jobPosting = jobPostService.getJobPostingById(id)
                .orElseThrow(() -> new RuntimeException("Job posting not found"));
        return jobPostService.getApplicationsForStudent(String.valueOf(id));
    }


    @PutMapping("/applications/{applicationId}/exam")
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff')")
    public JobApplication setExamDetails(
            @PathVariable Long applicationId,
            @RequestParam String examLink,
            @RequestParam String testScheduledTime) { // Expecting ISO format, e.g., "2025-03-25T10:00:00"
        LocalDateTime scheduledTime = LocalDateTime.parse(testScheduledTime);
        return jobPostService.setExamDetails(applicationId, examLink, scheduledTime);
    }

    @Scheduled(fixedRate = 60000)
    @Transactional
    public void sendExamLinks() {
        List<JobApplication> applications = jobApplicationRepository.findAll();
        LocalDateTime now = LocalDateTime.now();
        for (JobApplication app : applications) {
            Hibernate.initialize(app.getRounds()); // Force initialization within transaction
            if (app.getTestScheduledTime() != null && now.isAfter(app.getTestScheduledTime()) && app.getExamLink() != null) {
                app.getRounds().stream()
                        .filter(r -> "Test".equals(r.getName()) && "Opened".equals(r.getStatus()))
                        .findFirst()
                        .ifPresent(r -> {
                            emailService.sendExamLink(app.getStudentEmail(), app.getExamLink());
                            app.setTestScheduledTime(null);
                            jobApplicationRepository.save(app);
                        });
            }
        }
    }

    @PutMapping("/applications/{applicationId}/rounds/{roundName}")
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff')")
    public JobApplication updateRoundStatus(
            @PathVariable Long applicationId,
            @PathVariable String roundName,
            @RequestParam String status) {
        return jobPostService.updateRoundStatus(applicationId, roundName, status);
    }

    @GetMapping("/{id}/applications/export")
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff')")
    public ResponseEntity<byte[]> exportApplicationsToExcel(@PathVariable Long id) throws IOException {
        List<JobApplication> applications = jobPostService.getApplicationsForJobPost(id);

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Applicants");

        // Header row
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("Student Email");
        headerRow.createCell(1).setCellValue("Company Name");
        headerRow.createCell(2).setCellValue("Job Role");
        headerRow.createCell(3).setCellValue("Status");
        headerRow.createCell(4).setCellValue("Application Date");
        headerRow.createCell(5).setCellValue("Rounds");

        // Data rows
        int rowNum = 1;
        for (JobApplication app : applications) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(app.getStudentEmail());
            row.createCell(1).setCellValue(app.getCompanyName());
            row.createCell(2).setCellValue(app.getJobRole());
            row.createCell(3).setCellValue(app.getStatus());
            // Handle null applicationDate
            row.createCell(4).setCellValue(app.getApplicationDate() != null ? app.getApplicationDate().toString() : "N/A");
            row.createCell(5).setCellValue(app.getRounds().stream()
                    .map(r -> r.getName() + ": " + r.getStatus())
                    .collect(Collectors.joining(", ")));
        }

        // Auto-size columns
        for (int i = 0; i < 6; i++) {
            sheet.autoSizeColumn(i);
        }

        // Write to byte array
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "applicants.xlsx");

        return new ResponseEntity<>(out.toByteArray(), headers, HttpStatus.OK);
    }


}