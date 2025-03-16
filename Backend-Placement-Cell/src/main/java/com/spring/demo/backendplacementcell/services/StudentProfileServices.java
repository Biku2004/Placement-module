//package com.spring.demo.backendplacementcell.services;
//
//import com.spring.demo.backendplacementcell.entities.StudentProfile;
//import com.spring.demo.backendplacementcell.repository.StudentProfileRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class StudentProfileServices {
//    @Autowired
//    private StudentProfileRepository studentProfileRepository;
//
//    public List<StudentProfile> searchStudents(String branch, Double minCgpa, String skills, Integer year) {
//        return studentProfileRepository.findFilteredStudents(branch, minCgpa, skills, year);
//    }
//
//    public void shortlistStudent(Long studentId, Long recruiterId) {
//        // Logic to save shortlisted student (e.g., in a separate table)
//    }
//}
