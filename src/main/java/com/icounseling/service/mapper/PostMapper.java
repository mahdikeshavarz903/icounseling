package com.icounseling.service.mapper;

import com.icounseling.domain.*;
import com.icounseling.service.dto.PostDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Post} and its DTO {@link PostDTO}.
 */
@Mapper(componentModel = "spring", uses = {ScheduleMapper.class, CounselorMapper.class})
public interface PostMapper extends EntityMapper<PostDTO, Post> {

    @Mapping(source = "schedule.id", target = "scheduleId")
    @Mapping(source = "counselor.id", target = "counselorId")
    PostDTO toDto(Post post);

    @Mapping(source = "scheduleId", target = "schedule")
    @Mapping(target = "comments", ignore = true)
    @Mapping(target = "removeComment", ignore = true)
    @Mapping(source = "counselorId", target = "counselor")
    Post toEntity(PostDTO postDTO);

    default Post fromId(Long id) {
        if (id == null) {
            return null;
        }
        Post post = new Post();
        post.setId(id);
        return post;
    }
}
