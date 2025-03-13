package com.spring.demo.backendplacementcell.services;

import com.spring.demo.backendplacementcell.entities.Profile;
import com.spring.demo.backendplacementcell.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ProfileService {
    @Autowired
    private ProfileRepository profileRepository;

    public Profile getProfile(String email) {
        return profileRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Profile not found for email: " + email));
    }

    public Profile createOrUpdateProfile(String email, String fullName, String phoneNumber, String address,
                                         String bio, MultipartFile image) throws IOException {
        Profile profile = profileRepository.findByEmail(email)
                .orElse(new Profile(email, null, null, null, null, null));

        // Update fields if provided
        if (fullName != null && !fullName.isEmpty()) profile.setFullName(fullName);
        if (phoneNumber != null && !phoneNumber.isEmpty()) profile.setPhoneNumber(phoneNumber);
        if (address != null && !address.isEmpty()) profile.setAddress(address);
        if (bio != null && !bio.isEmpty()) profile.setBio(bio);
        if (image != null && !image.isEmpty()) profile.setProfileImage(image.getBytes());

        return profileRepository.save(profile);
    }

    public byte[] getProfileImage(String email) {
        Profile profile = getProfile(email);
        return profile.getProfileImage();
    }
}