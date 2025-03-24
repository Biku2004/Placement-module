package com.spring.demo.backendplacementcell.controllers;

import com.spring.demo.backendplacementcell.entities.JobApplication;
import com.spring.demo.backendplacementcell.entities.JobApplicationStats;
import com.spring.demo.backendplacementcell.entities.JobPosting;
import com.spring.demo.backendplacementcell.repository.JobApplicationRepository;
import com.spring.demo.backendplacementcell.repository.JobPostingRepository;
import com.spring.demo.backendplacementcell.services.EmailService;
import com.spring.demo.backendplacementcell.services.JobPostingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/recruiter/jobs")
@CrossOrigin(origins = {"http://localhost:4200", "https://placement-cell-cutm.netlify.app/"})
public class JobPostingController {

    @Autowired
    private JobPostingService jobPostingService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private JobPostingRepository jobPostingRepository;


    private JobApplicationStats jobApplicationStats;


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


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff','Student')")
    public JobPosting createJobPosting(
            @RequestPart("jobPosting") JobPosting jobPosting,
            @RequestPart(value = "logo", required = false) MultipartFile logo,
//            @RequestBody JobPosting jobPosting
            Principal principal) throws IOException {
        if (logo != null && !logo.isEmpty()) {
            jobPosting.setLogo(logo.getBytes());
        }
        return jobPostingService.createJobPosting(jobPosting, principal.getName());
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff')")
    public JobPosting updateJobPosting(
            @PathVariable Long id,
            @RequestPart("jobPosting") JobPosting jobPosting,
            @RequestPart(value = "logo", required = false) MultipartFile logo,
            Principal principal) throws IOException {
        if (logo != null && !logo.isEmpty()) {
            jobPosting.setLogo(logo.getBytes());
        }
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

    // New endpoint to get logo as base64
    @GetMapping("/{id}/logo")
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff')")
    public ResponseEntity<String> getJobPostingLogo(@PathVariable Long id) {
        JobPosting jobPosting = jobPostingService.getJobPostingById(id)
                .orElseThrow(() -> new RuntimeException("Job posting not found"));
        byte[] logo = jobPosting.getLogo();
        if (logo != null && logo.length > 0) {
            String base64Logo = Base64.getEncoder().encodeToString(logo);
            return ResponseEntity.ok("data:image/jpeg;base64," + base64Logo); // Adjust MIME type if needed
        }
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}/deregister")
    @PreAuthorize("hasAuthority('Student')")
    public ResponseEntity<Void> deregisterFromJobPosting(@PathVariable Long id, Principal principal) {
        jobPostingService.deregisterFromJobPosting(id, principal.getName());
        return ResponseEntity.ok().build();
    }

    // Add to JobPostingController
    @PutMapping("/applications/{applicationId}/reject")
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff')")
    public JobApplication rejectApplication(@PathVariable Long applicationId) {
        return jobPostingService.rejectApplication(applicationId);
    }

    @PutMapping("/applications/{applicationId}/shortlist")
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff')")
    public JobApplication shortlistApplication(@PathVariable Long applicationId) {
        return jobPostingService.shortlistApplication(applicationId);
    }

    @PutMapping("/applications/{applicationId}/rounds/{roundName}")
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff')")
    public JobApplication updateRoundStatus(
            @PathVariable Long applicationId,
            @PathVariable String roundName,
            @RequestParam String status) {
        return jobPostingService.updateRoundStatus(applicationId, roundName, status);
    }

    @GetMapping("/{id}/applications/export")
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff')")
    public ResponseEntity<byte[]> exportApplicationsToExcel(@PathVariable Long id) throws IOException {
        List<JobApplication> applications = jobPostingService.getApplicationsForJobPosting(id);

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

    @PutMapping("/applications/bulk-reject")
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff')")
    public List<JobApplication> bulkRejectApplications(@RequestBody List<Long> applicationIds) {
        return jobPostingService.bulkRejectApplications(applicationIds);
    }

    @PutMapping("/applications/bulk-shortlist")
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff')")
    public List<JobApplication> bulkShortlistApplications(@RequestBody List<Long> applicationIds) {
        return jobPostingService.bulkShortlistApplications(applicationIds);
    }

    // JobPostingController.java
    @PutMapping("/applications/{applicationId}/exam")
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff')")
    public JobApplication setExamDetails(
            @PathVariable Long applicationId,
            @RequestParam String examLink,
            @RequestParam String testScheduledTime) { // Expecting ISO format, e.g., "2025-03-25T10:00:00"
        LocalDateTime scheduledTime = LocalDateTime.parse(testScheduledTime);
        return jobPostingService.setExamDetails(applicationId, examLink, scheduledTime);
    }

//    @Scheduled(fixedRate = 60000)
//    @Transactional
//    public void sendExamLinks() {
//        List<JobApplication> applications = jobApplicationRepository.findAll();
//        LocalDateTime now = LocalDateTime.now();
//        for (JobApplication app : applications) {
//            Hibernate.initialize(app.getRounds()); // Force initialization within transaction
//            if (app.getTestScheduledTime() != null && now.isAfter(app.getTestScheduledTime()) && app.getExamLink() != null) {
//                app.getRounds().stream()
//                        .filter(r -> "Test".equals(r.getName()) && "Opened".equals(r.getStatus()))
//                        .findFirst()
//                        .ifPresent(r -> {
//                            emailService.sendExamLink(app.getStudentEmail(), app.getExamLink());
//                            app.setTestScheduledTime(null);
//                            jobApplicationRepository.save(app);
//                        });
//            }
//        }
//    }

    @PutMapping("/{id}/hide")
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff')")
    public JobPosting hideJobPosting(@PathVariable Long id, Principal principal) {
        return jobPostingService.hideJobPosting(id, principal.getName());
    }


    @GetMapping("/batch-years")
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff')")
    public List<String> getBatchYears() {
        return jobPostingRepository.findAll().stream()
                .map(JobPosting::getBatchYear)
                .distinct()
                .collect(Collectors.toList());
    }


    @PutMapping("/{id}/unhide")
    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff')")
    public JobPosting unhideJobPosting(@PathVariable Long id, Principal principal) {
        return jobPostingService.unhideJobPosting(id, principal.getName());
    }


//    Staff Card ----------------------------------------

//    @GetMapping("/stats")
//    @PreAuthorize("hasAnyAuthority('Recruiter', 'Staff','Student')")
//    public JobApplicationStats getJobApplicationStats() {
//        return jobPostingService.getJobApplicationStats();
//    }



}