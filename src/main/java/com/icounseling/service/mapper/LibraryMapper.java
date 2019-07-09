package com.icounseling.service.mapper;

import com.icounseling.domain.*;
import com.icounseling.service.dto.LibraryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Library} and its DTO {@link LibraryDTO}.
 */
@Mapper(componentModel = "spring", uses = {VisitorMapper.class})
public interface LibraryMapper extends EntityMapper<LibraryDTO, Library> {

    @Mapping(source = "visitor.id", target = "visitorId")
    LibraryDTO toDto(Library library);

    @Mapping(source = "visitorId", target = "visitor")
    @Mapping(target = "categories", ignore = true)
    @Mapping(target = "removeCategory", ignore = true)
    Library toEntity(LibraryDTO libraryDTO);

    default Library fromId(Long id) {
        if (id == null) {
            return null;
        }
        Library library = new Library();
        library.setId(id);
        return library;
    }
}
