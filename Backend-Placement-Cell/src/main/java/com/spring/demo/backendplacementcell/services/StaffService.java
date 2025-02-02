package com.spring.demo.backendplacementcell.services;

import com.spring.demo.backendplacementcell.entities.Student;
import com.spring.demo.backendplacementcell.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffService {

    @Autowired
    private StaffRepository staffRepository;

    public List<Student> getAllStaff() {
        return staffRepository.findByRole("Staff");
    }
}