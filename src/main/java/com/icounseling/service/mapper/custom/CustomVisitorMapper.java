package com.icounseling.service.mapper.custom;

import com.icounseling.domain.Authority;
import com.icounseling.domain.User;
import com.icounseling.domain.Visitor;
import com.icounseling.service.dto.VisitorDTO;
import com.icounseling.service.dto.custom.CustomVisitorDTO;
import com.icounseling.service.mapper.EducationMapper;
import com.icounseling.service.mapper.EntityMapper;
import com.icounseling.service.mapper.ScoreMapper;
import com.icounseling.service.mapper.UserMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * Mapper for the entity {@link Visitor} and its DTO {@link VisitorDTO}.
 */
@Mapper(componentModel = "spring", uses = {ScoreMapper.class, EducationMapper.class, UserMapper.class})
public interface CustomVisitorMapper extends EntityMapper<CustomVisitorDTO, Visitor> {

    @Mapping(source = "score", target = "scoreDTO")
    @Mapping(source = "education", target = "educationDTO")
    @Mapping(source = "user", target = "userDTO")
    CustomVisitorDTO toDto(Visitor visitor);

    @Mapping(source = "scoreDTO", target = "score")
    @Mapping(source = "educationDTO", target = "education")
    @Mapping(source = "userDTO", target = "user")
    @Mapping(target = "transactions", ignore = true)
    @Mapping(target = "removeTransaction", ignore = true)
    @Mapping(target = "jobs", ignore = true)
    @Mapping(target = "removeJob", ignore = true)
    @Mapping(target = "counselingCase", ignore = true)
    @Mapping(target = "library", ignore = true)
    Visitor toEntity(CustomVisitorDTO visitorDTO);

    default Visitor fromId(Long id) {
        if (id == null) {
            return null;
        }
        Visitor visitor = new Visitor();
        visitor.setId(id);
        return visitor;
    }

    default User userFromId(Long id) {
        if (id == null) {
            return null;
        }
        User user = new User();
        user.setId(id);
        return user;
    }

    default Set<String> stringsFromAuthorities (Set<Authority> authorities) {
        return authorities.stream().map(Authority::getName)
            .collect(Collectors.toSet());
    }

    default  Set<Authority> authoritiesFromStrings(Set<String> strings) {
        return strings.stream().map(string -> {
            Authority auth = new Authority();
            auth.setName(string);
            return auth;
        }).collect(Collectors.toSet());
    }
}

