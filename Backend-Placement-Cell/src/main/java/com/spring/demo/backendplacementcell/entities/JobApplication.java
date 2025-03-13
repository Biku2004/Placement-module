package com.spring.demo.backendplacementcell.entities;

import jakarta.persistence.*;

@Entity
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentEmail; // The Student who applied
    private Long jobPostId; // The JobPost they applied to
    private String status; // e.g., "Applied", "Reviewed", "Accepted"

    // Constructors, getters, setters
    public JobApplication() {}

    public JobApplication(String studentEmail, Long jobPostId, String status) {
        this.studentEmail = studentEmail;
        this.jobPostId = jobPostId;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public Long getJobPostId() {
        return jobPostId;
    }

    public void setJobPostId(Long jobPostId) {
        this.jobPostId = jobPostId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}