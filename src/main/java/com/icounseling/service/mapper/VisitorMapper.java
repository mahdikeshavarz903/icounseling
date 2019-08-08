package com.icounseling.service.mapper;

import com.icounseling.domain.*;
import com.icounseling.service.dto.VisitorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Visitor} and its DTO {@link VisitorDTO}.
 */
@Mapper(componentModel = "spring", uses = {ScoreMapper.class, EducationMapper.class, UserMapper.class})
public interface VisitorMapper extends EntityMapper<VisitorDTO, Visitor> {

    @Mapping(source = "score.id", target = "scoreId")
    @Mapping(source = "education.id", target = "educationId")
    @Mapping(source = "user.id", target = "userId")
    VisitorDTO toDto(Visitor visitor);

    @Mapping(source = "scoreId", target = "score")
    @Mapping(source = "educationId", target = "education")
    @Mapping(source = "userId", target = "user")
    @Mapping(target = "transactions", ignore = true)
    @Mapping(target = "removeTransaction", ignore = true)
    @Mapping(target = "jobs", ignore = true)
    @Mapping(target = "removeJob", ignore = true)
    @Mapping(target = "counselingCase", ignore = true)
    @Mapping(target = "library", ignore = true)
    Visitor toEntity(VisitorDTO visitorDTO);

    default Visitor fromId(Long id) {
        if (id == null) {
            return null;
        }
        Visitor visitor = new Visitor();
        visitor.setId(id);
        return visitor;
    }
}
