package com.sun.tingle.member.api.service;

import com.sun.tingle.file.service.S3service;
import com.sun.tingle.member.api.dto.TokenInfo;
import com.sun.tingle.member.api.dto.request.MemberReqDto;
import com.sun.tingle.member.api.dto.request.TokenReqDto;
import com.sun.tingle.member.api.dto.response.MemberResDto;
import com.sun.tingle.member.api.dto.response.TokenResDto;
import com.sun.tingle.member.db.entity.MemberEntity;
import com.sun.tingle.member.db.entity.TokenEntity;
import com.sun.tingle.member.db.repository.MemberRepository;
import com.sun.tingle.member.db.repository.TokenRepository;
import com.sun.tingle.member.util.JwtUtil;
import com.sun.tingle.member.util.RedisUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
@Service
public class MemberServiceImpl implements MemberService {
    @Autowired
    MemberRepository memberRepository;

    @Autowired
    TokenRepository tokenRepository;

    @Autowired
    S3service s3service;

    @Lazy
    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    RedisUtil redisUtil;
 
    @Override
    public MemberResDto getMemberInfo(Long id) {
        MemberEntity memberEntity = memberRepository.findById(id).orElseThrow(NoSuchElementException::new);
        return entity2Dto(memberEntity);
    }

    @Override
    @Transactional
    public MemberResDto updateMemberInfo(MemberReqDto memberReqDto) {
        MemberEntity memberEntity = getMemberById(memberReqDto.getId()).orElseThrow(NoSuchElementException::new);
        memberEntity.setName(memberReqDto.getName());
        memberEntity.setEmail(memberReqDto.getEmail());
        memberEntity.setPhone(memberReqDto.getPhone());
        memberEntity = memberRepository.save(memberEntity);
        return entity2Dto(memberEntity);
    }

    @Override
    public void deleteMemberInfo(Long id) {
        memberRepository.delete(
                memberRepository.findById(id).orElseThrow(() -> new NoSuchElementException())
        );
    }

    @Override
    public Optional<MemberEntity> getMemberByMemberId(String memberId) {
        return memberRepository.findByMemberId(memberId);
    }

    @Override
    public Optional<MemberEntity> getMemberById(Long id) {
        return memberRepository.findById(id);
    }

    @Override
    public MemberEntity getMemberByEmail(String email){
        return memberRepository.findByEmail(email).orElseThrow(NoSuchElementException::new);
    }

    @Override
    public MemberResDto entity2Dto(MemberEntity memberEntity) {
        MemberResDto memberResDto = MemberResDto.builder()
                .id(memberEntity.getId())
                .memberId(memberEntity.getMemberId())
                .name(memberEntity.getName())
                .phone(memberEntity.getPhone())
                .email(memberEntity.getEmail())
                .auth(memberEntity.getAuth())
                .profileImage(memberEntity.getProfileImage())
                .build();
        return memberResDto;
    }

    @Override
    public String updateProfileImage(Long id, MultipartFile file) throws IOException {
        MemberEntity memberEntity = getMemberById(id).orElseThrow(NoSuchElementException::new);
        String url = s3service.ProfileUpload(file);
        memberEntity.setProfileImage(url);

        memberRepository.save(memberEntity);
        return url;
    }

    @Override
    public void logout(String refreshToken){
        redisUtil.deleteData(refreshToken);
    }
}
