package com.spring.demo.backendplacementcell.entities;

import jakarta.persistence.*;
import com.spring.demo.backendplacementcell.entities.Round;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Entity
public class JobApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentEmail; // The Student who applied
    private Long jobPostId; // The JobPost they applied to
    private String status; // e.g., "Applied", "Reviewed", "Accepted"

    // Add these fields
    private String companyName;
    private String jobRole;

    @Lob // Large Object for storing image data
    private byte[] logo; // Stores the image as binary data

    private LocalDate applicationDate;

    private String examLink; // New field for exam link
    private LocalDateTime testScheduledTime; // New field for scheduled test time



    // Constructors, getters, setters
    public JobApplication() {}

//    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "application_id")
    private List<Round> rounds = new ArrayList<>();

    public JobApplication(String studentEmail, Long jobPostId, String status) {
        this.studentEmail = studentEmail;
        this.jobPostId = jobPostId;
        this.status = status;
        this.applicationDate = LocalDate.now();

        // Initialize default rounds
        this.rounds.add(new Round("Application Submitted", "Completed", LocalDate.now()));
        this.rounds.add(new Round("Screening", "Pending"));
        this.rounds.add(new Round("Test", "Pending")); // Add Test round
        this.rounds.add(new Round("Interview", "Pending"));
        this.rounds.add(new Round("Offer", "Pending"));
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

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getJobRole() {
        return jobRole;
    }

    public void setJobRole(String jobRole) {
        this.jobRole = jobRole;
    }

    public byte[] getLogo() {
        return logo;
    }

    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    public List<Round> getRounds() {
        return rounds;
    }

    public void setRounds(List<Round> rounds) {
        this.rounds = rounds;
    }

    public LocalDate getApplicationDate() {
        return applicationDate;
    }

    public void setApplicationDate(LocalDate applicationDate) {
        this.applicationDate = applicationDate;
    }

    public String getExamLink() {
        return examLink;
    }

    public void setExamLink(String examLink) {
        this.examLink = examLink;
    }

    public LocalDateTime getTestScheduledTime() {
        return testScheduledTime;
    }

    public void setTestScheduledTime(LocalDateTime testScheduledTime) {
        this.testScheduledTime = testScheduledTime;
    }
}

//package com.spring.demo.backendplacementcell.entities;

//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import lombok.Data;

//import java.time.LocalDate;

//@Entity
//@Data
//public class Round {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String name;
//    private String status; // Pending, Opened, Completed, Failed
//    private LocalDate date;
//
//    public Round() {
//    }
//
//    public Round(String name, String status) {
//        this.name = name;
//        this.status = status;
//    }
//
//    public Round(String name, String status, LocalDate date) {
//        this.name = name;
//        this.status = status;
//        this.date = date;
//    }
//}
