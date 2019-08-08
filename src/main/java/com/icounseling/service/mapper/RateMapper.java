package com.icounseling.service.mapper;

import com.icounseling.domain.*;
import com.icounseling.service.dto.RateDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Rate} and its DTO {@link RateDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface RateMapper extends EntityMapper<RateDTO, Rate> {


    @Mapping(target = "document", ignore = true)
    @Mapping(target = "comment", ignore = true)
    Rate toEntity(RateDTO rateDTO);

    default Rate fromId(Long id) {
        if (id == null) {
            return null;
        }
        Rate rate = new Rate();
        rate.setId(id);
        return rate;
    }
}
