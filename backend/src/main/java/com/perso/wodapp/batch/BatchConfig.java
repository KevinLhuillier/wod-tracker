package com.perso.wodapp.batch;

import com.perso.wodapp.model.WodType;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
import org.springframework.batch.item.file.mapping.DefaultLineMapper;
import org.springframework.batch.item.file.transform.DelimitedLineTokenizer;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.transaction.PlatformTransactionManager;
import com.perso.wodapp.model.Wod;
import com.perso.wodapp.repository.WodRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.beans.PropertyEditorSupport;
import java.util.Map;


@Configuration
@RequiredArgsConstructor
public class BatchConfig {

    @Autowired
    private WodRepository wodRepository;

    @Value("classpath:wods.csv")
    private Resource resource;

    @Bean
    public Step step1(JobRepository jobRepository, PlatformTransactionManager transactionManager){
        return new StepBuilder("step_one", jobRepository)
                .<Wod, Wod>chunk(10, transactionManager)
                .reader(reader())
                .processor(processor())
                .writer(writer())
                .build();
    }

    @Bean
    public Job job1(JobRepository jobRepository, PlatformTransactionManager transactionManager){
        return new JobBuilder("job1", jobRepository)
                .start(step1(jobRepository, transactionManager))
                .build();
    }

    @Bean
    public FlatFileItemReader<Wod> reader() {
        DefaultLineMapper<Wod> lineMapper = new DefaultLineMapper<>();
        DelimitedLineTokenizer lineTokenizer = new DelimitedLineTokenizer();
        lineTokenizer.setNames("name", "type", "description");

        BeanWrapperFieldSetMapper<Wod> fieldSetMapper = new BeanWrapperFieldSetMapper<>();
        fieldSetMapper.setTargetType(Wod.class);
        fieldSetMapper.setCustomEditors(Map.of(WodType.class, new PropertyEditorSupport() {
            @Override
            public void setAsText(String text) {
                setValue(WodType.valueOf(text.toUpperCase()));
            }
        }));

        lineMapper.setLineTokenizer(lineTokenizer);
        lineMapper.setFieldSetMapper(fieldSetMapper);

        return new FlatFileItemReaderBuilder<Wod>()
                .name("wodItemReader")
                .resource(resource)
                .linesToSkip(1)  // Skip header line
                .lineMapper(lineMapper)
                .build();
    }

//    @Bean
//    public FlatFileItemReader<Wod> reader() {
//        return new FlatFileItemReaderBuilder<Wod>()
//                .name("wodItemReader")
//                .resource(resource)
//                .linesToSkip(1)
//                .delimited()
//                .names("name", "type", "description")
//                .lineMapper(new DefaultLineMapper<Wod>() {{
//                    setLineTokenizer(new DelimitedLineTokenizer() {{
//                        setNames("name", "type", "description");
//                    }});
//                    setFieldSetMapper(new BeanWrapperFieldSetMapper<>() {{
//                        setTargetType(Wod.class);
//                        setCustomEditors(Map.of(WodType.class, new PropertyEditorSupport() {
//                            @Override
//                            public void setAsText(String text) {
//                                setValue(WodType.valueOf(text.toUpperCase()));
//                            }
//                        }));
//                    }});
//                }})
//                .build();
//    }

    @Bean
    public ItemProcessor<Wod, Wod> processor() {
        return wod -> wod;
    }

    @Bean
    public ItemWriter<Wod> writer() {
        return items -> wodRepository.saveAll(items);
    }

}