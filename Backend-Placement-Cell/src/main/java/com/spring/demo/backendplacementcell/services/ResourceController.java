package com.spring.demo.backendplacementcell.services;


import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recruiter/resources")
public class ResourceController {
    @GetMapping("/brochure")
    public ResponseEntity<Resource> getBrochure() {
        Resource resource = new ClassPathResource("static/placement_brochure.pdf");
        return ResponseEntity.ok().body(resource);
    }
}