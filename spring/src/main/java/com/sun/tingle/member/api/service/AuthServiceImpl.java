package com.sun.tingle.member.api.service;

import com.sun.tingle.member.api.dto.request.MemberReqDto;
import com.sun.tingle.member.api.dto.response.MemberResDto;
import com.sun.tingle.member.db.entity.MemberEntity;
import com.sun.tingle.member.db.entity.TokenEntity;
import com.sun.tingle.member.db.repository.MemberRepository;
import com.sun.tingle.member.db.repository.TokenRepository;
import com.sun.tingle.member.util.JwtUtil;
import com.sun.tingle.member.util.RedisUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class AuthServiceImpl implements AuthService{
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    TokenRepository tokenRepository;

    @Autowired
    MemberService memberService;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    RedisUtil redisUtil;

    @Override
    public MemberResDto signUp(MemberReqDto member) {
        MemberEntity memberEntity = MemberEntity.builder()
                .memberId(member.getMemberId())
                .password(passwordEncoder.encode(member.getPassword()))
                .name(member.getName())
                .phone(member.getPhone())
                .email(member.getEmail())
                .auth(member.getAuth())
                .profileImage(member.getProfileImage())
                .build();

        memberEntity = memberRepository.save(memberEntity);

        return memberService.entity2Dto(memberEntity);
    }

    @Override
    public Map<String, Object> login(MemberEntity memberEntity){
        Map<String, Object> map = new HashMap<>();

        //토큰 발급
        String token = jwtUtil.createToken(memberEntity.getId(), memberEntity.getEmail(), memberEntity.getName());
        String refreshToken = jwtUtil.createRefreshToken(memberEntity.getId(), memberEntity.getEmail(), memberEntity.getName());

        // redis, mysql에 저장
        redisUtil.setDataExpire(refreshToken, String.valueOf(memberEntity.getId()), jwtUtil.REFRESH_TIME);
        TokenEntity tokenEntity = TokenEntity.builder()
                .mid(memberEntity.getId())
                .expireTime(jwtUtil.REFRESH_TIME)
                .build();
        tokenRepository.save(tokenEntity);

        MemberResDto memberResDto = memberService.entity2Dto(memberEntity);

        map.put("accessToken", token);
        map.put("refreshToken", refreshToken);
        map.put("member", memberResDto);

        return map;
    }

    @Override
    public void duplicateId(String memberId) {
        memberRepository.findByMemberId(memberId)
                .ifPresent(m -> {
                    throw new IllegalStateException("중복되는 아이디 입니다");
                });
    }

    @Override
    public void duplicateEmail(String email) {
        memberRepository.findByEmail(email)
                .ifPresent(m -> {
                    throw new IllegalStateException("중복되는 이메일 입니다");
                });
    }

    @Override
    public void resetPassword(MemberEntity memberEntity, String password) {
        memberEntity.setPassword(passwordEncoder.encode(password));
        memberRepository.save(memberEntity);
    }
}
