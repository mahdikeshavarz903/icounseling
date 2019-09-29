package com.icounseling.service.mapper.custom;

import com.icounseling.domain.*;
import com.icounseling.service.dto.CounselingCaseDTO;

import com.icounseling.service.dto.UserDTO;
import com.icounseling.service.dto.custom.CustomCounselingCaseDTO;
import com.icounseling.service.mapper.CounselorMapper;
import com.icounseling.service.mapper.EntityMapper;
import com.icounseling.service.mapper.VisitorMapper;
import org.mapstruct.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Mapper for the entity {@link CounselingCase} and its DTO {@link CounselingCaseDTO}.
 */
@Mapper(componentModel = "spring", uses = {VisitorMapper.class, CounselorMapper.class})
public interface CustomCounselingCaseMapper extends EntityMapper<CustomCounselingCaseDTO, CounselingCase> {

    @Mapping(source = "visitor.score", target = "scoreDTO")
    @Mapping(source = "visitor.education", target = "educationDTO")
    @Mapping(source = "visitor.user",target = "userDTO")
    @Mapping(source = "counselor.id", target = "counselorId")
    CustomCounselingCaseDTO toDto(CounselingCase counselingCase);

    @Mapping(source = "educationDTO", target = "visitor.education")
    @Mapping(source = "scoreDTO", target = "visitor.score")
    @Mapping(source = "counselorId", target = "counselor")
    @Mapping(source = "userDTO",target = "visitor.user")
    CounselingCase toEntity(CustomCounselingCaseDTO customCounselingCaseDTO);

    default CounselingCase fromId(Long id) {
        if (id == null) {
            return null;
        }
        CounselingCase counselingCase = new CounselingCase();
        counselingCase.setId(id);
        return counselingCase;
    }

    default  User userFromId(Long id) {
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
