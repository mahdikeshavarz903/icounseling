package com.icounseling.service.mapper;

import com.icounseling.domain.*;
import com.icounseling.service.dto.EducationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Education} and its DTO {@link EducationDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface EducationMapper extends EntityMapper<EducationDTO, Education> {


    @Mapping(target = "reseumes", ignore = true)
    @Mapping(target = "removeReseume", ignore = true)
    @Mapping(target = "counselor", ignore = true)
    @Mapping(target = "visitor", ignore = true)
    Education toEntity(EducationDTO educationDTO);

    default Education fromId(Long id) {
        if (id == null) {
            return null;
        }
        Education education = new Education();
        education.setId(id);
        return education;
    }
}
