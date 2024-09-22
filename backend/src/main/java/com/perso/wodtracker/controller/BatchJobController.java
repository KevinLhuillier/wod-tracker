//package com.perso.wodapp.controller;
//
//import org.springframework.batch.core.Job;
//import org.springframework.batch.core.JobParametersBuilder;
//import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
//import org.springframework.batch.core.launch.JobLauncher;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/api/batch")
//public class BatchJobController {
//
//    @Autowired
//    private JobLauncher jobLauncher;
//
//    @Autowired
//    private Job importWodJob;
//
//    @PostMapping("/run")
//    public ResponseEntity<String> runBatchJob() {
//        try {
//            jobLauncher.run(importWodJob, new JobParametersBuilder()
//                    .addLong("startAt", System.currentTimeMillis()).toJobParameters());
//            return ResponseEntity.ok("Batch job has been invoked");
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("Failed to run batch job: " + e.getMessage());
//        }
//    }
//}
//
