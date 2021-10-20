package com.sun.tingle.member.api.service;

import com.sun.tingle.member.api.dto.MemberDto;
import com.sun.tingle.member.db.entity.MemberEntity;

import java.util.Optional;

public interface MemberService {
     MemberEntity registMember(MemberDto member);

    void duplicateId(String id);

    void duplicateEmail(String email);

    Optional<MemberEntity> getMemberById(String id);

    MemberEntity getMemberByEmail(String email);

    void changePassword(MemberEntity memberEntity, String password);
}
