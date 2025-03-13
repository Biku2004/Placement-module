// src/main/java/com/spring/demo/backendplacementcell/controllers/CompanyController.java
package com.spring.demo.backendplacementcell.controllers;

import com.spring.demo.backendplacementcell.entities.Company;
import com.spring.demo.backendplacementcell.services.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:4200","https://placement-cell-cutm.netlify.app/"})
@RestController
@RequestMapping("/api/companies")

public class CompanyController {
    @Autowired
    private CompanyService companyService;

    @GetMapping
    public List<Company> getAllCompanies() {
        return companyService.getAllCompanies();
    }

    @PostMapping
    public Company createCompany(@RequestBody Company company) {
        return companyService.createCompany(company);
    }

    @PutMapping("/{id}")
    public Company updateCompany(@PathVariable Long id, @RequestBody Company company) {
        return companyService.updateCompany(id, company);
    }

    @DeleteMapping("/{id}")
    public void deleteCompany(@PathVariable Long id) {
        companyService.deleteCompany(id);
    }
}