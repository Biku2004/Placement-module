package com.spring.demo.backendplacementcell.repository;


import com.spring.demo.backendplacementcell.entities.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StudentProfileRepository extends JpaRepository<StudentProfile, Long> {
    @Query("SELECT s FROM Student s WHERE s.consentGiven = true AND " +
            "(:branch IS NULL OR s.branch = :branch) AND " +
            "(:minCgpa IS NULL OR s.cgpa >= :minCgpa) AND " +
            "(:skills IS NULL OR s.skills LIKE %:skills%) AND " +
            "(:year IS NULL OR s.yearOfStudy = :year)")
    List<StudentProfile> findFilteredStudents(String branch, Double minCgpa, String skills, Integer year);
}