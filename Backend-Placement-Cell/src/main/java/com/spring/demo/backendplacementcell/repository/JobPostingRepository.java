package com.spring.demo.backendplacementcell.repository;

import com.spring.demo.backendplacementcell.entities.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {
    List<JobPosting> findByCreatedBy(String createdBy);
    List<JobPosting> findByCreatedByAndBatchYear(String createdBy, String batchYear);
    List<JobPosting> findByStatus(String status); // Fetch job postings by status


    List<JobPosting> findByBatchYearAndIsHiddenFalse(String batchYear); // Visible posts for students
    List<JobPosting> findByBatchYear(String batchYear); // All posts for staff/recruiters
    List<JobPosting> findByArchiveYear(String archiveYear); // Archived posts


//    List<JobPosting> findByCreatedBy(String createdBy);
    List<JobPosting> findByIsHiddenFalse();


}