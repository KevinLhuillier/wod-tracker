package com.perso.wodtracker.mapper;

import com.perso.wodtracker.dto.ExerciseDTO;
import com.perso.wodtracker.dto.WodResponseDTO;
import com.perso.wodtracker.model.Composition;
import com.perso.wodtracker.model.Wod;

import java.util.stream.Collectors;

public class WodMapper {

    // Méthode pour mapper un Wod vers un WodResponseDTO
    public static WodResponseDTO mapToWodResponseDTO(Wod wod) {
        WodResponseDTO dto = new WodResponseDTO();
        dto.setWodId(wod.getWodId());
        dto.setTypeWod(wod.getType().trim());
        dto.setFormatWod(wod.getFormat().trim());
        dto.setTimeLimit(wod.getTimeCap().toString());
        dto.setRounds(wod.getRounds().toString());
        dto.setDate(wod.getDate());

        // Mapper les compositions vers la liste des `ExerciseDTO`
        dto.setExercises(wod.getCompositions().stream()
                .map(WodMapper::mapToExerciseDTO)
                .collect(Collectors.toList()));

        return dto;
    }

    // Méthode pour mapper une Composition vers un ExerciseDTO
    private static ExerciseDTO mapToExerciseDTO(Composition composition) {
        ExerciseDTO dto = new ExerciseDTO();
        dto.setOrder(composition.getStepNumber());
        dto.setReps(Integer.valueOf(composition.getReps()));
        dto.setSkill(composition.getSkill().getName().trim());

        // Si le poids est null, mettre une chaîne vide
        dto.setWeight(composition.getWeight() != null ? Integer.valueOf(composition.getWeight()) : 0);

        return dto;
    }
}

