//// src/main/java/com/example/demo/batch/BatchConfig2.java
//package com.perso.wodapp.config;
//
//import com.perso.wodapp.config.WodItemReader;
//import com.perso.wodapp.model.Wod;
//import com.perso.wodapp.repository.WodRepository;
//import org.springframework.batch.core.Job;
//import org.springframework.batch.core.Step;
//import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
//import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
//import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
//import org.springframework.batch.item.ItemProcessor;
//import org.springframework.batch.item.ItemWriter;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@EnableBatchProcessing
//public class BatchConfig {
//
//    @Autowired
//    private JobBuilderFactory jobBuilderFactory;
//
//    @Autowired
//    private StepBuilderFactory stepBuilderFactory;
//
//    @Autowired
//    private WodItemReader wodItemReader;
//
//    @Autowired
//    private WodRepository wodRepository;
//
//    @Bean
//    public Job importWodJob() {
//        return jobBuilderFactory.get("importWodJob")
//                .start(step1())
//                .build();
//    }
//
//    @Bean
//    public Step step1() {
//        return stepBuilderFactory.get("step1")
//                .<Wod, Wod>chunk(10)
//                .reader(wodItemReader)
//                .processor(wodItemProcessor())
//                .writer(wodItemWriter())
//                .build();
//    }
//
//    @Bean
//    public ItemProcessor<Wod, Wod> wodItemProcessor() {
//        return wod -> wod;
//    }
//
//    @Bean
//    public ItemWriter<Wod> wodItemWriter() {
//        return items -> wodRepository.saveAll(items);
//    }
//}
