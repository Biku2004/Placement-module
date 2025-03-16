package com.spring.demo.backendplacementcell.repository;



import com.spring.demo.backendplacementcell.entities.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {
    List<JobPosting> findByRecruiterId(Long recruiterId);
}