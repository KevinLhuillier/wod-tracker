package com.perso.wodtracker.mapper;

import com.perso.wodtracker.dto.BlockDTO;
import com.perso.wodtracker.dto.ExerciseDTO;
import com.perso.wodtracker.dto.WodResponseDTO;
import com.perso.wodtracker.model.Composition;
import com.perso.wodtracker.model.Wod;

import java.util.List;
import java.util.stream.Collectors;

public class WodMapper {

    // Méthode pour mapper un Wod vers un WodResponseDTO
    public static WodResponseDTO mapToWodResponseDTO(Wod wod) {
        WodResponseDTO dto = new WodResponseDTO();
        dto.setWodId(wod.getWodId());
        dto.setTypeWod(wod.getType().trim());
        dto.setTimeLimit(wod.getTimeCap().toString());
        dto.setRounds(wod.getRounds().toString());
        dto.setDate(wod.getDate());

        // Mapper les compositions vers les blocks
        dto.setBlocks(wod.getCompositions().stream()
                .collect(Collectors.groupingBy(Composition::getBlockOrder))
                .entrySet().stream()
                .map(entry -> mapToBlockDTO(Integer.valueOf(entry.getKey()), entry.getValue()))
                .collect(Collectors.toList()));

        return dto;
    }

    // Mapper un groupe de compositions vers un BlockDTO
    private static BlockDTO mapToBlockDTO(Integer blockOrder, List<Composition> compositions) {
        BlockDTO blockDTO = new BlockDTO();

        // On suppose que toutes les compositions d'un block ont les mêmes caractéristiques de block
        Composition firstComposition = compositions.get(0);
        blockDTO.setOrder(blockOrder);
        blockDTO.setFormat(firstComposition.getBlockFormat().trim());
        blockDTO.setTimeLimit(firstComposition.getBlockTimeCap());
        blockDTO.setRounds(firstComposition.getBlockRounds());

        // Mapper chaque composition comme un step (ExerciseDTO)
        blockDTO.setExercises(compositions.stream()
                .map(WodMapper::mapToExerciseDTO)
                .collect(Collectors.toList()));

        return blockDTO;
    }

    // Mapper une Composition vers un ExerciseDTO
    private static ExerciseDTO mapToExerciseDTO(Composition composition) {
        ExerciseDTO dto = new ExerciseDTO();
        dto.setOrder(composition.getStepOrder());
        dto.setSkill(composition.getSkill().getName().trim());
        dto.setAmount(Integer.valueOf(composition.getAmount()));
        dto.setUnit(composition.getUnit().trim());
        dto.setWeight(composition.getWeight() != null ? Float.valueOf(composition.getWeight()) : 0);

        return dto;
    }
}

