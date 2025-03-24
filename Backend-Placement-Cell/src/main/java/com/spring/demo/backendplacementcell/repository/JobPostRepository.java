package com.spring.demo.backendplacementcell.repository;

import com.spring.demo.backendplacementcell.entities.JobPost;
import com.spring.demo.backendplacementcell.entities.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobPostRepository extends JpaRepository<JobPost, Long> {
    List<JobPost> findByCreatedBy(String createdBy); // For Recruiters
    List<JobPost> findByStatus(String status);
}

