package com.perso.wodtracker.service;

import com.perso.wodtracker.dto.BlockDTO;
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
        wod.setTimeCap(wodDTO.getTimeLimit());
        wod.setRounds(wodDTO.getRounds());
        wod.setDate(wodDTO.getWorkoutDate());

        // Initialisation de la liste des compositions
        wod.setCompositions(new ArrayList<>()); // Important pour éviter les erreurs de nullité

        // 2. Créer les entités Composition à partir du JSON et les associer au Wod
        for (BlockDTO block : wodDTO.getBlocks()) {
            for (ExerciseDTO exercise : block.getExercises()) {
                // Créer une nouvelle entité Composition pour chaque exercice
                Composition composition = new Composition();
                composition.setBlockOrder((short) block.getOrder());
                composition.setBlockFormat(block.getFormat());
                composition.setBlockTimeCap((short) block.getTimeLimit());
                composition.setBlockRounds((short) block.getRounds());

                // Récupérer le Skill correspondant au nom
                Skill skill = skillRepository.findByName(exercise.getSkill());
                if (skill == null) {
                    throw new RuntimeException("Skill not found: " + exercise.getSkill());
                }
                composition.setStepOrder((short) exercise.getOrder());
                composition.setSkill(skill);
                composition.setAmount((short) exercise.getAmount());
                composition.setUnit(exercise.getUnit());
                // Convertir la liste de styles en chaîne de caractères séparée par des points-virgules
                String styles = (exercise.getStyles() != null) ? String.join(";", exercise.getStyles()) : null;
                composition.setStyles(styles);
                // Convertir la liste de tools en chaîne de caractères séparée par des points-virgules
                String tools = (exercise.getTools() != null) ? String.join(";", exercise.getTools()) : null;
                composition.setTools(tools);
                composition.setWeight(exercise.getWeight() != null ? exercise.getWeight() : null);

                // Associer Composition à Wod
                composition.setWod(wod); // Composition connaît son Wod
                wod.getCompositions().add(composition); // Wod connaît ses Compositions
            }
        }
        // 3. Sauvegarder le Wod (cela sauvegarde aussi les Compositions grâce à CascadeType.ALL)
        return wodRepository.save(wod);
    }

    @Transactional
    public Wod updateWod(Wod wod, WodDTO wodDTO) {
        // 1. Mettre à jour les attributs de base du Wod
        wod.setType(wodDTO.getTypeWod());
        wod.setTimeCap(wodDTO.getTimeLimit());
        wod.setRounds(wodDTO.getRounds());
        wod.setDate(wodDTO.getWorkoutDate());

        // 2. Gérer les compositions existantes (triées par block_order et step_order)
        Map<String, Composition> existingCompositions = wod.getCompositions().stream()
                .collect(Collectors.toMap(
                        comp -> comp.getBlockOrder() + "-" + comp.getStepOrder(), // Clé basée sur block_order et step_order
                        composition -> composition));

        // 3. Liste pour stocker les compositions mises à jour
        List<Composition> updatedCompositions = new ArrayList<>();

        for (BlockDTO block : wodDTO.getBlocks()) {
            for (ExerciseDTO exercise : block.getExercises()) {
                // Récupérer le Skill correspondant au nom
                Skill skill = skillRepository.findByName(exercise.getSkill());
                if (skill == null) {
                    throw new RuntimeException("Skill not found: " + exercise.getSkill());
                }

                // Créer une clé unique pour la composition (block_order + step_order)
                String compositionKey = block.getOrder() + "-" + exercise.getOrder();

                // Vérifier si une composition avec le même block_order et step_order existe déjà
                Composition composition = existingCompositions.get(compositionKey);
                if (composition == null) {
                    // Si elle n'existe pas, créer une nouvelle Composition
                    composition = new Composition();
                    composition.setWod(wod); // Associer la nouvelle Composition au Wod
                }

                // Mettre à jour les attributs de la Composition
                composition.setBlockOrder((short) block.getOrder());
                composition.setBlockFormat(block.getFormat());
                composition.setBlockTimeCap((short) block.getTimeLimit());
                composition.setBlockRounds((short) block.getRounds());

                composition.setStepOrder((short) exercise.getOrder());
                composition.setSkill(skill);
                composition.setAmount((short) exercise.getAmount());
                composition.setUnit(exercise.getUnit());
                String styles = (exercise.getStyles() != null) ? String.join(";", exercise.getStyles()) : null;
                composition.setStyles(styles);
                String tools = (exercise.getTools() != null) ? String.join(";", exercise.getTools()) : null;
                composition.setTools(tools);
                composition.setWeight(exercise.getWeight() != null ? exercise.getWeight() : null);

                // Ajouter la composition mise à jour à la liste
                updatedCompositions.add(composition);
            }
        }

        // 4. Supprimer les compositions qui ne sont plus présentes dans le DTO
        wod.getCompositions().clear(); // Supprimer les compositions actuelles
        wod.getCompositions().addAll(updatedCompositions); // Ajouter les nouvelles compositions

        // 5. Sauvegarder le Wod mis à jour (les Compositions seront également mises à jour grâce à CascadeType.ALL)
        return wodRepository.save(wod);
    }


}

