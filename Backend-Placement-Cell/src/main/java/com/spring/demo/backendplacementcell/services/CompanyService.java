package com.spring.demo.backendplacementcell.services;

import com.spring.demo.backendplacementcell.entities.Company;
import com.spring.demo.backendplacementcell.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

//@Service
//public class CompanyService {
//    @Autowired
//    private CompanyRepository companyRepository;
//
//    public List<Company> getAllCompanies() {
//        return companyRepository.findAll();
//    }
//
//    public Company createCompany(Company company) {
//        return companyRepository.save(company);
//    }
//
//    public Company updateCompany(Long id, Company company) {
//        company.setId(id);
//        return companyRepository.save(company);
//    }
//
//    public void deleteCompany(Long id) {
//        companyRepository.deleteById(id);
//    }
//}


@Service
public class CompanyService {
    @Autowired
    private CompanyRepository companyRepository;

    public List<Company> getCompaniesForUser(String email, String role) {
        if ("Recruiter".equals(role)) {
            return companyRepository.findByCreatedBy(email); // Recruiter sees their own companies
        } else if ("Staff".equals(role)) {
            return companyRepository.findAll(); // Staff sees all companies
        }
        return Collections.emptyList(); // Students don’t see companies
    }

    public Company createCompany(Company company, String email) {
        company.setCreatedBy(email); // Set the creator
        return companyRepository.save(company);
    }

    public Company updateCompany(Long id, Company company, String email, String role) {
        Company existing = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        if ("Recruiter".equals(role) && !existing.getCreatedBy().equals(email)) {
            throw new RuntimeException("You can only update your own companies");
        }
        company.setId(id);
        company.setCreatedBy(existing.getCreatedBy()); // Preserve original creator
        return companyRepository.save(company);
    }

    public void deleteCompany(Long id, String email, String role) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        if ("Recruiter".equals(role) && !company.getCreatedBy().equals(email)) {
            throw new RuntimeException("You can only delete your own companies");
        }
        companyRepository.deleteById(id);
    }
}