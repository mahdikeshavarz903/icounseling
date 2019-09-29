package com.icounseling.service.mapper.custom;

import com.icounseling.domain.Counselor;
import com.icounseling.service.dto.CounselorDTO;
import com.icounseling.service.dto.custom.CustomCounselorDTO;
import com.icounseling.service.mapper.EducationMapper;
import com.icounseling.service.mapper.EntityMapper;
import com.icounseling.service.mapper.ScoreMapper;
import com.icounseling.service.mapper.UserMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

/**
 * Mapper for the entity {@link Counselor} and its DTO {@link CounselorDTO}.
 */
@Mapper(componentModel = "spring", uses = {EducationMapper.class, ScoreMapper.class, UserMapper.class})
public interface CustomCounselorMapper extends EntityMapper<CustomCounselorDTO, Counselor> {

    @Mapping(source = "education", target = "education")
    @Mapping(source = "score", target = "score")
    @Mapping(source = "user", target = "user")
    CustomCounselorDTO toDto(Counselor counselor);

    @Mapping(source = "education", target = "education")
    @Mapping(source = "score", target = "score")
    @Mapping(source = "user", target = "user")
    @Mapping(target = "posts", ignore = true)
    @Mapping(target = "removePost", ignore = true)
    @Mapping(target = "documents", ignore = true)
    @Mapping(target = "removeDocument", ignore = true)
    @Mapping(target = "timeReserveds", ignore = true)
    @Mapping(target = "removeTimeReserved", ignore = true)
    @Mapping(target = "plannings", ignore = true)
    @Mapping(target = "removePlanning", ignore = true)
    @Mapping(target = "counselingCases", ignore = true)
    @Mapping(target = "removeCounselingCase", ignore = true)
    Counselor toEntity(CustomCounselorDTO customcounselorDTO);

    default Counselor fromId(Long id) {
        if (id == null) {
            return null;
        }
        Counselor counselor = new Counselor();
        counselor.setId(id);
        return counselor;
    }
}
