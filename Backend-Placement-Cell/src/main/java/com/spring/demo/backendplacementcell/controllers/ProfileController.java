package com.spring.demo.backendplacementcell.controllers;

import com.spring.demo.backendplacementcell.entities.Profile;
import com.spring.demo.backendplacementcell.services.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = {"http://localhost:4200", "https://placement-cell-cutm.netlify.app"})
public class ProfileController {
    @Autowired
    private ProfileService profileService;

    @GetMapping
    @PreAuthorize("hasAnyAuthority('Student', 'Staff', 'Recruiter')")
    public ResponseEntity<Profile> getMyProfile(Principal principal) {
        Profile profile = profileService.getProfile(principal.getName());
        return ResponseEntity.ok(profile);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyAuthority('Student', 'Staff', 'Recruiter')")
    public ResponseEntity<Profile> updateProfile(
            @RequestParam(required = false) String fullName,
            @RequestParam(required = false) String phoneNumber,
            @RequestParam(required = false) String address,
            @RequestParam(required = false) String bio,
            @RequestParam(required = false) MultipartFile image,
            Principal principal) throws IOException {
        Profile updatedProfile = profileService.createOrUpdateProfile(
                principal.getName(), fullName, phoneNumber, address, bio, image);
        return ResponseEntity.ok(updatedProfile);
    }

    @GetMapping("/image")
    @PreAuthorize("hasAnyAuthority('Student', 'Staff', 'Recruiter')")
    public ResponseEntity<byte[]> getMyProfileImage(Principal principal) {
        byte[] image = profileService.getProfileImage(principal.getName());
        if (image == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG) // Adjust based on your image type (e.g., JPEG, PNG)
                .body(image);
    }
}