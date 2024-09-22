package com.perso.wodapp.controller;

import com.perso.wodapp.model.Wod;
import com.perso.wodapp.repository.WodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "http://57.129.42.227:3000"})
@RestController
@RequestMapping("/api/wods")
public class WodController {

    @Autowired
    private WodRepository wodRepository;

    @GetMapping
    public List<Wod> getAllWods() {
        return wodRepository.findAll();
    }

    @GetMapping("/{id}")
    public Wod getWodById(@PathVariable Long id) {
        return wodRepository.findById(id).orElseThrow(() -> new RuntimeException("WOD not found"));
    }

    @PostMapping
    public Wod createWod(@RequestBody Wod wod) {
        return wodRepository.save(wod);
    }

    @PutMapping("/{id}")
    public Wod updateWod(@PathVariable Long id, @RequestBody Wod wodDetails) {
        Wod wod = wodRepository.findById(id).orElseThrow(() -> new RuntimeException("WOD not found"));
        wod.setName(wodDetails.getName());
        wod.setType(wodDetails.getType());
        wod.setDescription(wodDetails.getDescription());

        return wodRepository.save(wod);
    }

    @DeleteMapping("/{id}")
    public void deleteWod(@PathVariable Long id) {
        Wod wod = wodRepository.findById(id).orElseThrow(() -> new RuntimeException("WOD not found"));
        wodRepository.delete(wod);
    }
}
