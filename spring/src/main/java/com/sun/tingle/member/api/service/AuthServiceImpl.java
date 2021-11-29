package com.sun.tingle.member.api.service;

import com.sun.tingle.calendar.responsedto.CalendarRpDto;
import com.sun.tingle.calendar.service.CalendarService;
import com.sun.tingle.member.api.dto.TokenInfo;
import com.sun.tingle.member.api.dto.request.MemberReqDto;
import com.sun.tingle.member.api.dto.response.MemberResDto;
import com.sun.tingle.member.api.dto.response.TokenResDto;
import com.sun.tingle.member.db.entity.MemberEntity;
import com.sun.tingle.member.db.repository.MemberRepository;
import com.sun.tingle.member.db.repository.TokenRepository;
import com.sun.tingle.member.util.JwtUtil;
import com.sun.tingle.member.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{
    private final PasswordEncoder passwordEncoder;

    private final MemberRepository memberRepository;

    private final MemberService memberService;

    private final CalendarService calendarService;

    private final JwtUtil jwtUtil;

    private final RedisUtil redisUtil;

    @Value("${jwt.refresh}")
    private long RefreshTime;

    @Override
    @Transactional
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
        
        //dafault calender 생성
        CalendarRpDto calendarRpDto = calendarService.insertCalendar(calendarService.getRandomSentence(),memberEntity.getName() + "의 캘린더", memberEntity.getId());
        memberEntity.setDefaultCalendar(calendarRpDto.getCalendarCode());
        memberEntity = memberRepository.save(memberEntity);

        return memberService.entity2Dto(memberEntity);
    }


    @Override
    public Map<String, Object> login(MemberEntity memberEntity){
        Map<String, Object> map = new HashMap<>();

        //토큰 발급
        String token = jwtUtil.createToken(memberEntity.getId(), memberEntity.getEmail(), memberEntity.getName());
        String refreshToken = jwtUtil.createRefreshToken(memberEntity.getId(), memberEntity.getEmail(), memberEntity.getName());

        // redis에 refreshToken 저장
        redisUtil.setDataExpire(refreshToken, String.valueOf(memberEntity.getId()), RefreshTime);

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

    @Override
    public TokenResDto reissue(String refreshToken) throws Exception{
        TokenResDto tokenResDto = new TokenResDto();
        TokenInfo tokenInfo = jwtUtil.getClaimsFromJwt(refreshToken);

        //redis에 정보가 있을때
        if (tokenInfo.getId() == Long.parseLong(redisUtil.getData(refreshToken))) {
            String newAccessToken = jwtUtil.createToken(tokenInfo.getId(), tokenInfo.getEmail(), tokenInfo.getName());
            tokenResDto.setAccessToken(newAccessToken);
            //재인증
            Authentication authentication = jwtUtil.getAuthentication(newAccessToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        return tokenResDto;
    }
}
