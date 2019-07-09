package com.icounseling.service.mapper;

import com.icounseling.domain.*;
import com.icounseling.service.dto.PlanningDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Planning} and its DTO {@link PlanningDTO}.
 */
@Mapper(componentModel = "spring", uses = {CounselorMapper.class})
public interface PlanningMapper extends EntityMapper<PlanningDTO, Planning> {

    @Mapping(source = "counselor.id", target = "counselorId")
    PlanningDTO toDto(Planning planning);

    @Mapping(target = "tasks", ignore = true)
    @Mapping(target = "removeTask", ignore = true)
    @Mapping(source = "counselorId", target = "counselor")
    Planning toEntity(PlanningDTO planningDTO);

    default Planning fromId(Long id) {
        if (id == null) {
            return null;
        }
        Planning planning = new Planning();
        planning.setId(id);
        return planning;
    }
}
