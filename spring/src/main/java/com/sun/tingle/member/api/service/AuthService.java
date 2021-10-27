package com.sun.tingle.member.api.service;

import com.sun.tingle.member.api.dto.request.MemberReqDto;
import com.sun.tingle.member.api.dto.response.MemberResDto;
import com.sun.tingle.member.db.entity.MemberEntity;

import java.util.Map;

public interface AuthService {
    MemberResDto signUp(MemberReqDto member);

    Map<String, Object> login(MemberEntity memberEntity);

    void duplicateId(String id);

    void duplicateEmail(String email);

    void resetPassword(MemberEntity memberEntity, String password);
}
