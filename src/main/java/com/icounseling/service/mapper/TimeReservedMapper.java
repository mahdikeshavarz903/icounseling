package com.icounseling.service.mapper;

import com.icounseling.domain.*;
import com.icounseling.service.dto.TimeReservedDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link TimeReserved} and its DTO {@link TimeReservedDTO}.
 */
@Mapper(componentModel = "spring", uses = {CounselorMapper.class})
public interface TimeReservedMapper extends EntityMapper<TimeReservedDTO, TimeReserved> {

    @Mapping(source = "counselor.id", target = "counselorId")
    TimeReservedDTO toDto(TimeReserved timeReserved);

    @Mapping(source = "counselorId", target = "counselor")
    TimeReserved toEntity(TimeReservedDTO timeReservedDTO);

    default TimeReserved fromId(Long id) {
        if (id == null) {
            return null;
        }
        TimeReserved timeReserved = new TimeReserved();
        timeReserved.setId(id);
        return timeReserved;
    }
}
