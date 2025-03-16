package com.spring.demo.backendplacementcell.repository;

import com.spring.demo.backendplacementcell.entities.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {
    List<JobPosting> findByCreatedBy(String createdBy);
}