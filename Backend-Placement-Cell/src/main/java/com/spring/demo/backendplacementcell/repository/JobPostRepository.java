package com.spring.demo.backendplacementcell.repository;

import com.spring.demo.backendplacementcell.entities.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobPostRepository extends JpaRepository<JobPost, Long> {
}