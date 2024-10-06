package com.perso.wodtracker.controller;

import com.perso.wodtracker.dto.WodDTO;
import com.perso.wodtracker.dto.WodResponseDTO;
import com.perso.wodtracker.mapper.WodMapper;
import com.perso.wodtracker.model.Wod;
import com.perso.wodtracker.repository.WodRepository;
import com.perso.wodtracker.service.WodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = {"http://localhost:5173", "http://57.129.42.227:3000"})
@RestController
@RequestMapping("/api/wods")
public class WodController {

    @Autowired
    private WodRepository wodRepository;

    @Autowired
    private WodService wodService;

    @GetMapping
    // Retourner tous les WODs sous forme de liste de WodResponseDTO
    public List<WodResponseDTO> getAllWods() {
        return wodRepository.findAll().stream()
                .map(WodMapper::mapToWodResponseDTO) // Mapper chaque entité vers un DTO
                .collect(Collectors.toList());
    }

//    @GetMapping
//    public List<Wod> getAllWods() {
//        return wodRepository.findAll();
//    }
//
//    @GetMapping("/{id}")
//    public Wod getWodById(@PathVariable Long id) {
//        return wodRepository.findById(id).orElseThrow(() -> new RuntimeException("WOD not found"));
//    }

    @PostMapping
    public ResponseEntity<Wod> createWod(@RequestBody WodDTO wodDTO) {
        Wod createdWod = wodService.createWod(wodDTO);
        return ResponseEntity.ok(createdWod);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Wod> updateWod(@PathVariable Long id, @RequestBody WodDTO wodDTO) {
        Wod wod = wodRepository.findById(id).orElseThrow(() -> new RuntimeException("WOD not found"));
        Wod updatedWod = wodService.updateWod(wod,wodDTO);
        return ResponseEntity.ok(updatedWod);

    }

    @DeleteMapping("/{id}")
    public void deleteWod(@PathVariable Long id) {
        Wod wod = wodRepository.findById(id).orElseThrow(() -> new RuntimeException("WOD not found"));
        wodRepository.delete(wod);
    }

}
