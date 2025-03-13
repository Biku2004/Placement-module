// src/main/java/com/spring/demo/backendplacementcell/controllers/CompanyController.java
package com.spring.demo.backendplacementcell.controllers;

import com.spring.demo.backendplacementcell.entities.Company;
import com.spring.demo.backendplacementcell.services.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

//@CrossOrigin(origins = {"http://localhost:4200","https://placement-cell-cutm.netlify.app/"})
//@RestController
//@RequestMapping("/api/companies")

//public class CompanyController {
//    @Autowired
//    private CompanyService companyService;
//
//    @GetMapping
//    public List<Company> getAllCompanies() {
//        return companyService.getAllCompanies();
//    }
//
//    @PostMapping
//    public Company createCompany(@RequestBody Company company) {
//        return companyService.createCompany(company);
//    }
//
//    @PutMapping("/{id}")
//    public Company updateCompany(@PathVariable Long id, @RequestBody Company company) {
//        return companyService.updateCompany(id, company);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteCompany(@PathVariable Long id) {
//        companyService.deleteCompany(id);
//    }
//}

@RestController
@RequestMapping("/api/companies")
@CrossOrigin(origins = {"http://localhost:4200", "https://placement-cell-cutm.netlify.app"})
public class CompanyController {
    @Autowired
    private CompanyService companyService;

    @GetMapping
    public List<Company> getMyCompanies(Principal principal, Authentication authentication) {
        String role = authentication.getAuthorities().iterator().next().getAuthority();
        return companyService.getCompaniesForUser(principal.getName(), role);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('Recruiter')") // Only Recruiters can create
    public Company createCompany(@RequestBody Company company, Principal principal) {
        return companyService.createCompany(company, principal.getName());
    }

    @PutMapping("/{id}")
    public Company updateCompany(@PathVariable Long id, @RequestBody Company company,
                                 Principal principal, Authentication authentication) {
        String role = authentication.getAuthorities().iterator().next().getAuthority();
        return companyService.updateCompany(id, company, principal.getName(), role);
    }

    @DeleteMapping("/{id}")
    public void deleteCompany(@PathVariable Long id, Principal principal, Authentication authentication) {
        String role = authentication.getAuthorities().iterator().next().getAuthority();
        companyService.deleteCompany(id, principal.getName(), role);
    }
}