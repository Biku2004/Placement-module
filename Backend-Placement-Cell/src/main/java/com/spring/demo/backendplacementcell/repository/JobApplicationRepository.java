package com.spring.demo.backendplacementcell.repository;

import com.spring.demo.backendplacementcell.entities.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    // Find all applications by a specific student's email
    List<JobApplication> findByStudentEmail(String studentEmail);

    // Optional: Find applications for a specific job post
    List<JobApplication> findByJobPostId(Long jobPostId);

    // Optional: Check if a student has already applied to a job post
    boolean existsByStudentEmailAndJobPostId(String studentEmail, Long jobPostId);
}