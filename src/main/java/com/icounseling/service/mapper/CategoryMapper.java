package com.icounseling.service.mapper;

import com.icounseling.domain.*;
import com.icounseling.service.dto.CategoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Category} and its DTO {@link CategoryDTO}.
 */
@Mapper(componentModel = "spring", uses = {LibraryMapper.class})
public interface CategoryMapper extends EntityMapper<CategoryDTO, Category> {

    @Mapping(source = "library.id", target = "libraryId")
    CategoryDTO toDto(Category category);

    @Mapping(target = "documents", ignore = true)
    @Mapping(target = "removeDocument", ignore = true)
    @Mapping(source = "libraryId", target = "library")
    Category toEntity(CategoryDTO categoryDTO);

    default Category fromId(Long id) {
        if (id == null) {
            return null;
        }
        Category category = new Category();
        category.setId(id);
        return category;
    }
}
