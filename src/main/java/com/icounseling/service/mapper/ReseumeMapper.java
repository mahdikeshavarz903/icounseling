package com.icounseling.service.mapper;

import com.icounseling.domain.*;
import com.icounseling.service.dto.ReseumeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Reseume} and its DTO {@link ReseumeDTO}.
 */
@Mapper(componentModel = "spring", uses = {EducationMapper.class})
public interface ReseumeMapper extends EntityMapper<ReseumeDTO, Reseume> {

    @Mapping(source = "education.id", target = "educationId")
    ReseumeDTO toDto(Reseume reseume);

    @Mapping(source = "educationId", target = "education")
    Reseume toEntity(ReseumeDTO reseumeDTO);

    default Reseume fromId(Long id) {
        if (id == null) {
            return null;
        }
        Reseume reseume = new Reseume();
        reseume.setId(id);
        return reseume;
    }
}
