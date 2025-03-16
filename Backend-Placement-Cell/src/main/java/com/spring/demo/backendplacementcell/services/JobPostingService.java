package com.spring.demo.backendplacementcell.services;

import com.spring.demo.backendplacementcell.entities.JobPosting;
import com.spring.demo.backendplacementcell.entities.Recruiter;
import com.spring.demo.backendplacementcell.repository.JobPostingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class JobPostingService {
    @Autowired
    private JobPostingRepository jobPostingRepository;

    public JobPosting createJobPosting(JobPosting jobPosting, MultipartFile pdf, Long recruiterId) throws Exception {
        jobPosting.setRecruiter(new Recruiter() {{ setId(recruiterId); }});
        if (pdf != null && !pdf.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + pdf.getOriginalFilename();
            Path path = Paths.get("uploads/" + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, pdf.getBytes());
            jobPosting.setPdfUrl("/uploads/" + fileName);
        }
        return jobPostingRepository.save(jobPosting);
    }

    public List<JobPosting> getJobPostings(Long recruiterId) {
        return jobPostingRepository.findByRecruiterId(recruiterId);
    }

    public JobPosting updateJobPosting(Long id, JobPosting jobPosting) {
        JobPosting existing = jobPostingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        existing.setTitle(jobPosting.getTitle());
        // Update other fields
        return jobPostingRepository.save(existing);
    }

    public void deleteJobPosting(Long id) {
        jobPostingRepository.deleteById(id);
    }
}