package com.icounseling.service.mapper;

import com.icounseling.domain.*;
import com.icounseling.service.dto.CounselingCaseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link CounselingCase} and its DTO {@link CounselingCaseDTO}.
 */
@Mapper(componentModel = "spring", uses = {VisitorMapper.class, CounselorMapper.class})
public interface CounselingCaseMapper extends EntityMapper<CounselingCaseDTO, CounselingCase> {

    @Mapping(source = "visitor.id", target = "visitorId")
    @Mapping(source = "counselor.id", target = "counselorId")
    CounselingCaseDTO toDto(CounselingCase counselingCase);

    @Mapping(source = "visitorId", target = "visitor")
    @Mapping(source = "counselorId", target = "counselor")
    CounselingCase toEntity(CounselingCaseDTO counselingCaseDTO);

    default CounselingCase fromId(Long id) {
        if (id == null) {
            return null;
        }
        CounselingCase counselingCase = new CounselingCase();
        counselingCase.setId(id);
        return counselingCase;
    }
}
