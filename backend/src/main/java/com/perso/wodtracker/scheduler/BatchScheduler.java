//package com.perso.wodapp.scheduler;
//
//import org.springframework.batch.core.Job;
//import org.springframework.batch.core.JobParametersBuilder;
//import org.springframework.batch.core.launch.JobLauncher;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.scheduling.annotation.EnableScheduling;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//
//@Component
//@EnableScheduling
//public class BatchScheduler {
//
//    @Autowired
//    private JobLauncher jobLauncher;
//
//    @Autowired
//    private Job importWodJob;
//
//    @Scheduled(cron = "0 0 0 * * ?") // Exécute tous les jours à minuit
//    public void runBatchJob() throws Exception {
//        jobLauncher.run(importWodJob, new JobParametersBuilder()
//                .addLong("startAt", System.currentTimeMillis()).toJobParameters());
//    }
//}
//
