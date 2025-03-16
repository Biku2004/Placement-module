package com.spring.demo.backendplacementcell.repository;

import com.spring.demo.backendplacementcell.entities.Interview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterviewRepository extends JpaRepository<Interview, Long> {
    List<Interview> findByRecruiterId(Long recruiterId);
}