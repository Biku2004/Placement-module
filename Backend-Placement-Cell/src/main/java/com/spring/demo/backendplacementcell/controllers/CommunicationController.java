//package com.spring.demo.backendplacementcell.controllers;
//
//import com.spring.demo.backendplacementcell.services.CommunicationService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/recruiter/communication")
//public class CommunicationController {
//    @Autowired
//    private CommunicationService communicationService;
//
//    @PostMapping("/message")
//    public ResponseEntity<Void> sendMessage(@RequestParam String recruiterEmail, @RequestBody String message) {
//        communicationService.sendMessageToPlacementCell(recruiterEmail, message);
//        return ResponseEntity.ok().build();
//    }
//}