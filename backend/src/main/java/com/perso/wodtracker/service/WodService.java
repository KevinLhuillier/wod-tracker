package com.perso.wodtracker.service;

import com.perso.wodtracker.dto.ExerciseDTO;
import com.perso.wodtracker.dto.WodDTO;
import com.perso.wodtracker.dto.WodResponseDTO;
import com.perso.wodtracker.mapper.WodMapper;
import com.perso.wodtracker.model.*;
import com.perso.wodtracker.repository.CompositionRepository;
import com.perso.wodtracker.repository.SkillRepository;
import com.perso.wodtracker.repository.WodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class WodService {

    @Autowired
    private WodRepository wodRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private CompositionRepository compositionRepository;

    // Retourner tous les WODs sous forme de liste de WodResponseDTO
    public List<WodResponseDTO> getAllWods() {
        return wodRepository.findAll().stream()
                .map(WodMapper::mapToWodResponseDTO) // Mapper chaque entité vers un DTO
                .collect(Collectors.toList());
    }

    @Transactional
    public Wod createWod(WodDTO wodDTO) {
        // 1. Créer l'entité Wod
        Wod wod = new Wod();
        wod.setType(wodDTO.getTypeWod());
        wod.setFormat(wodDTO.getFormatWod());
        wod.setTimeCap(wodDTO.getTimeLimit());
        wod.setRounds(wodDTO.getRounds());


        // Initialisation de la liste des compositions
        wod.setCompositions(new ArrayList<>()); // Important pour éviter les erreurs de nullité

        // 2. Créer les entités Composition à partir du JSON et les associer au Wod
        for (ExerciseDTO exercise : wodDTO.getExercises()) {
            // Récupérer le Skill correspondant au nom
            Skill skill = skillRepository.findByName(exercise.getSkill());
            if (skill == null) {
                throw new RuntimeException("Skill not found: " + exercise.getSkill());
            }

            // Créer l'entité Composition
            Composition composition = new Composition();
            composition.setStepNumber((short) exercise.getOrder());
            composition.setSkill(skill);
            composition.setReps((short) exercise.getReps());
            composition.setWeight(exercise.getWeight() != null ? exercise.getWeight().shortValue() : null);

            // Associer Composition à Wod
            composition.setWod(wod); // Composition connaît son Wod
            wod.getCompositions().add(composition); // Wod connaît ses Compositions
        }

        // 3. Sauvegarder le Wod (cela sauvegarde aussi les Compositions grâce à CascadeType.ALL)
        return wodRepository.save(wod);
    }

    @Transactional
    public Wod updateWod(Wod wod, WodDTO wodDTO) {
        // 1. Mettre à jour les attributs de base du Wod
        wod.setType(wodDTO.getTypeWod());
        wod.setFormat(wodDTO.getFormatWod());
        wod.setTimeCap(wodDTO.getTimeLimit());
        wod.setRounds(wodDTO.getRounds());

        // 2. Gérer les compositions existantes
        Map<Short, Composition> existingCompositions = wod.getCompositions().stream()
                .collect(Collectors.toMap(Composition::getStepNumber, composition -> composition));

        // 3. Liste pour stocker les compositions mises à jour
        List<Composition> updatedCompositions = new ArrayList<>();

        for (ExerciseDTO exercise : wodDTO.getExercises()) {
            // Récupérer le Skill correspondant au nom
            Skill skill = skillRepository.findByName(exercise.getSkill());
            if (skill == null) {
                throw new RuntimeException("Skill not found: " + exercise.getSkill());
            }

            // Vérifier si une composition avec le même stepNumber existe déjà
            Composition composition = existingCompositions.get((short) exercise.getOrder());
            if (composition == null) {
                // Si elle n'existe pas, créer une nouvelle Composition
                composition = new Composition();
                composition.setWod(wod); // Associer la nouvelle Composition au Wod
            }

            // Mettre à jour les attributs de la Composition
            composition.setStepNumber((short) exercise.getOrder());
            composition.setSkill(skill);
            composition.setReps((short) exercise.getReps());
            composition.setWeight(exercise.getWeight() != null ? exercise.getWeight().shortValue() : null);

            // Ajouter la composition mise à jour à la liste
            updatedCompositions.add(composition);
        }

        // 4. Supprimer les compositions qui ne sont plus présentes dans le DTO
        wod.getCompositions().clear(); // Supprimer les compositions actuelles
        wod.getCompositions().addAll(updatedCompositions); // Ajouter les nouvelles compositions

        // 5. Sauvegarder le Wod mis à jour (les Compositions seront également mises à jour grâce à CascadeType.ALL)
        return wodRepository.save(wod);
    }


}

