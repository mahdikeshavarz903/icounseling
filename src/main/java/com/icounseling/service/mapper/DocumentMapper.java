package com.icounseling.service.mapper;

import com.icounseling.domain.*;
import com.icounseling.service.dto.DocumentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Document} and its DTO {@link DocumentDTO}.
 */
@Mapper(componentModel = "spring", uses = {RateMapper.class, CommentMapper.class, CategoryMapper.class, CounselorMapper.class})
public interface DocumentMapper extends EntityMapper<DocumentDTO, Document> {

    @Mapping(source = "rate.id", target = "rateId")
    @Mapping(source = "rate.index", target = "rateIndex")
    @Mapping(source = "comment.id", target = "commentId")
    @Mapping(source = "gategory.id", target = "gategoryId")
    @Mapping(source = "gategory.categoryType", target = "gategoryCategoryType")
    @Mapping(source = "counselor.id", target = "counselorId")
    DocumentDTO toDto(Document document);

    @Mapping(source = "rateId", target = "rate")
    @Mapping(source = "commentId", target = "comment")
    @Mapping(source = "gategoryId", target = "gategory")
    @Mapping(source = "counselorId", target = "counselor")
    Document toEntity(DocumentDTO documentDTO);

    default Document fromId(Long id) {
        if (id == null) {
            return null;
        }
        Document document = new Document();
        document.setId(id);
        return document;
    }
}
