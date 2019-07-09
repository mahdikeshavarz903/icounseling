package com.icounseling.service.mapper;

import com.icounseling.domain.*;
import com.icounseling.service.dto.CommentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Comment} and its DTO {@link CommentDTO}.
 */
@Mapper(componentModel = "spring", uses = {ScheduleMapper.class, RateMapper.class, PostMapper.class})
public interface CommentMapper extends EntityMapper<CommentDTO, Comment> {

    @Mapping(source = "schedule.id", target = "scheduleId")
    @Mapping(source = "rate.id", target = "rateId")
    @Mapping(source = "post.id", target = "postId")
    CommentDTO toDto(Comment comment);

    @Mapping(source = "scheduleId", target = "schedule")
    @Mapping(source = "rateId", target = "rate")
    @Mapping(target = "document", ignore = true)
    @Mapping(source = "postId", target = "post")
    Comment toEntity(CommentDTO commentDTO);

    default Comment fromId(Long id) {
        if (id == null) {
            return null;
        }
        Comment comment = new Comment();
        comment.setId(id);
        return comment;
    }
}
