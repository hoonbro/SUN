package com.sun.tingle.member.api.service;

import com.sun.tingle.member.api.dto.MemberDto;
import com.sun.tingle.member.db.entity.MemberEntity;

import java.util.Optional;

public interface MemberService {
    public MemberEntity registMember(MemberDto member);

    public void duplicateId(String id);

    public void duplicateEmail(String email);

    public Optional<MemberEntity> getMemberById(String id);
}
