package com.icounseling.service.mapper;

import com.icounseling.domain.*;
import com.icounseling.service.dto.ScoreDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Score} and its DTO {@link ScoreDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ScoreMapper extends EntityMapper<ScoreDTO, Score> {


    @Mapping(target = "counselor", ignore = true)
    @Mapping(target = "visitor", ignore = true)
    Score toEntity(ScoreDTO scoreDTO);

    default Score fromId(Long id) {
        if (id == null) {
            return null;
        }
        Score score = new Score();
        score.setId(id);
        return score;
    }
}
