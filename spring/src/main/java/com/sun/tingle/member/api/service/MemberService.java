package com.sun.tingle.member.api.service;

import com.sun.tingle.member.api.dto.request.MemberResDto;
import com.sun.tingle.member.db.entity.MemberEntity;

import java.util.Optional;

public interface MemberService {
     MemberEntity registMember(MemberResDto member);

    void duplicateId(String id);

    void duplicateEmail(String email);

    Optional<MemberEntity> getMemberByMemberId(String id);

    Optional<MemberEntity> getMemberById(Long id);

    MemberEntity getMemberByEmail(String email);

    void changePassword(MemberEntity memberEntity, String password);
}
 