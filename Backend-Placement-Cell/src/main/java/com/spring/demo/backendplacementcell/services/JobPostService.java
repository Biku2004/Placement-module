package com.spring.demo.backendplacementcell.services;

// JobPostService.java
import com.spring.demo.backendplacementcell.entities.JobPost;
import com.spring.demo.backendplacementcell.repository.JobPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobPostService {
    @Autowired
    private JobPostRepository jobPostRepository;

    public List<JobPost> getAllJobPosts() {
        return jobPostRepository.findAll();
    }

    public JobPost createJobPost(JobPost jobPost) {
        return jobPostRepository.save(jobPost);
    }
}