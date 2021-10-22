package com.sun.tingle.member.api.service;

import com.sun.tingle.member.api.dto.request.MemberReqDto;
import com.sun.tingle.member.api.dto.response.MemberResDto;
import com.sun.tingle.member.db.entity.MemberEntity;

import java.util.Optional;

public interface MemberService {
    MemberResDto registMember(MemberReqDto member);

    MemberResDto getMemberInfo(Long id);

    MemberResDto updateMemberInfo(MemberReqDto memberReqDto);

    void deleteMemberInfo(Long id);

    void duplicateId(String id);

    void duplicateEmail(String email);

    Optional<MemberEntity> getMemberByMemberId(String id);

    Optional<MemberEntity> getMemberById(Long id);

    MemberEntity getMemberByEmail(String email);

    void changePassword(MemberEntity memberEntity, String password);

    MemberResDto entity2Dto(MemberEntity memberEntity);
}
 