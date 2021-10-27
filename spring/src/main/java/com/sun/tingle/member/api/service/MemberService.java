package com.sun.tingle.member.api.service;

import com.sun.tingle.member.api.dto.request.MemberReqDto;
import com.sun.tingle.member.api.dto.request.TokenReqDto;
import com.sun.tingle.member.api.dto.response.MemberResDto;
import com.sun.tingle.member.api.dto.response.TokenResDto;
import com.sun.tingle.member.db.entity.MemberEntity;

import java.util.Map;
import java.util.Optional;

public interface MemberService {

    MemberResDto getMemberInfo(Long id);

    MemberResDto updateMemberInfo(MemberReqDto memberReqDto);

    void deleteMemberInfo(Long id);



    Optional<MemberEntity> getMemberByMemberId(String id);

    Optional<MemberEntity> getMemberById(Long id);

    MemberEntity getMemberByEmail(String email);



    MemberResDto entity2Dto(MemberEntity memberEntity);

    TokenResDto reissue(TokenReqDto tokenReqDto);
}
 