//package com.perso.wodapp.config;
//
//import com.perso.wodapp.model.Wod;
//import org.apache.commons.csv.CSVFormat;
//import org.apache.commons.csv.CSVParser;
//import org.apache.commons.csv.CSVRecord;
//import org.springframework.batch.item.ItemReader;
//import org.springframework.stereotype.Component;
//
//import java.io.FileReader;
//import java.io.Reader;
//import java.nio.file.Paths;
//import java.util.Iterator;
//
//@Component
//public class WodItemReader implements ItemReader<Wod> {
//    private final String filePath = "src/main/resources/wods.csv";
//    private Iterator<CSVRecord> recordIterator;
//
//    @Override
//    public Wod read() throws Exception {
//        if (recordIterator == null) {
//            Reader reader = new FileReader(Paths.get(filePath).toFile());
//            CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader());
//            recordIterator = csvParser.iterator();
//        }
//
//        if (recordIterator.hasNext()) {
//            CSVRecord record = recordIterator.next();
//            return new Wod(
//                    null,
//                    record.get("name"),
//                    record.get("type"),
//                    record.get("description")
//            );
//        } else {
//            return null;
//        }
//    }
//}
//
