package com.sun.tingle.member.api.controller;

import com.sun.tingle.member.api.dto.request.MemberReqDto;
import com.sun.tingle.member.api.dto.request.PasswordCodeDto;
import com.sun.tingle.member.api.dto.response.MemberResDto;
import com.sun.tingle.member.api.dto.response.ResponseDto;
import com.sun.tingle.member.api.dto.response.TokenResDto;
import com.sun.tingle.member.api.service.AuthService;
import com.sun.tingle.member.api.service.EmailService;
import com.sun.tingle.member.api.service.MemberService;
import com.sun.tingle.member.db.entity.MemberEntity;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin("*")
public class AuthController {
    private final PasswordEncoder passwordEncoder;

    private final AuthService authService;

    private final MemberService memberService;

    private final EmailService emailService;

    @PostMapping
    public ResponseEntity<MemberResDto> signUp(@RequestBody MemberReqDto member){
        HttpStatus httpStatus = HttpStatus.CREATED;
        MemberResDto memberResDto;
        try {
            memberResDto = authService.signUp(member);
            log.info("회원가입 성공");
        }catch(Exception e){
            httpStatus = HttpStatus.CONFLICT;
            log.error("회원가입 실패");
            return new ResponseEntity<>(httpStatus);
        }
        return new ResponseEntity<MemberResDto>(memberResDto, httpStatus);
    }

    @GetMapping("/duplicate-id/{id}")
    public ResponseEntity<Void> duplicateId(@PathVariable("id") String id){
        HttpStatus httpStatus = HttpStatus.OK;
        try{
            authService.duplicateId(id);
            log.info("아이디 미중복");
        }catch (Exception e){
            httpStatus = HttpStatus.CONFLICT;
            log.error("아이디 중복");
            return new ResponseEntity<>(httpStatus);
        }

        return new ResponseEntity<>(httpStatus);
    }

    @GetMapping("/duplicate-email/{email}")
    public ResponseEntity<Void> duplicateEmail(@PathVariable("email") String email){
        HttpStatus httpStatus = HttpStatus.OK;
        try{
            authService.duplicateEmail(email);
            log.info("이메일 미중복");
        }catch (Exception e){
            httpStatus = HttpStatus.CONFLICT;
            log.error("이메일 중복");
            return new ResponseEntity<>(httpStatus);
        }

        return new ResponseEntity<>(httpStatus);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody MemberReqDto loginMember){
        Map<String, Object> map = new HashMap<String, Object>();
        HttpStatus httpStatus = HttpStatus.OK;
        try{
            Optional<MemberEntity> memberEntity = memberService.getMemberByMemberId(loginMember.getMemberId());
            //아이디가 없는 경우
            if(memberEntity.isEmpty()) {
                httpStatus = HttpStatus.NOT_FOUND;
                map.put("error", "Invalid ID");
                log.error("존재하지 않는 아이디");
                return new ResponseEntity<Map<String, Object>>(map, httpStatus);
            }
            //비밀번호가 틀린경우
            if(!passwordEncoder.matches(loginMember.getPassword(), memberEntity.get().getPassword())){
                httpStatus = HttpStatus.UNAUTHORIZED;
                map.put("error", "Wrong password");
                log.error("비밀번호 오류");
                return new ResponseEntity<Map<String, Object>>(map, httpStatus);
            }

            map = authService.login(memberEntity.get());

        }catch(Exception e){
            httpStatus = HttpStatus.BAD_REQUEST;
            log.error("{}",e);
            return new ResponseEntity<Map<String, Object>>(map, httpStatus);
        }

        return new ResponseEntity<Map<String, Object>>(map, httpStatus);
    }

    @PostMapping("/find-id")
    public ResponseEntity<Void> findId(@RequestBody MemberReqDto member){
        HttpStatus httpStatus = HttpStatus.OK;
        MemberEntity memberEntity;
        try {
            memberEntity = memberService.getMemberByEmail(member.getEmail());
            emailService.sendId(memberEntity.getEmail(), memberEntity.getMemberId());
        }catch (NoSuchElementException e){
            httpStatus = HttpStatus.NOT_FOUND;
            log.error("존재하지 않는 이메일 : {}", e);
            return new ResponseEntity<>(httpStatus);
        }

        return new ResponseEntity<>(httpStatus);
    }

    @PostMapping("/send-password-code")
    public ResponseEntity<Void> sendPasswordCode(@RequestBody MemberReqDto member){
        HttpStatus httpStatus = HttpStatus.OK;
        MemberEntity memberEntity;
        try {
            memberEntity = memberService.getMemberByEmail(member.getEmail());
            emailService.SendPasswordCode(memberEntity.getEmail(), memberEntity.getName());
        }catch (NoSuchElementException e){
            httpStatus = HttpStatus.NOT_FOUND;
            log.error("존재하지 않는 이메일 : {}", e);
            return new ResponseEntity<>(httpStatus);
        }
        return new ResponseEntity<>(httpStatus);
    }

    @PostMapping("/validate-password-code")
    public ResponseEntity<Void> validatePasswordCode(@RequestBody PasswordCodeDto passwordCodeDto){
        try {
            boolean validate = emailService.validatePasswordCode(passwordCodeDto);
            if(!validate)
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }catch (Exception e){
            log.error("비밀번호 초기화 인증 코드 에러: {}", e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@RequestBody MemberReqDto member){
        HttpStatus httpStatus = HttpStatus.CREATED;
        MemberEntity memberEntity;
        try {
            memberEntity = memberService.getMemberByEmail(member.getEmail());
            authService.resetPassword(memberEntity, member.getPassword());
        }catch (NoSuchElementException e){
            httpStatus = HttpStatus.NOT_FOUND;
            log.error("존재하지 않는 이메일 : {}", e);
            return new ResponseEntity<>(httpStatus);
        }
        return new ResponseEntity<>(httpStatus);
    }

    @GetMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request){
        TokenResDto tokenResDto;
        try {
            String refreshToken =request.getHeader("refreshToken");
            tokenResDto = authService.reissue(refreshToken);
            log.info("새로운 AccessToken 발급");
        }catch(NumberFormatException e){
            log.error("존재하지 않는 refreshToken", e);
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            return new ResponseEntity<>(new ResponseDto(HttpStatus.NOT_FOUND, "존재하지 않는 refreshToken", null), HttpStatus.NOT_FOUND);
        }catch (ExpiredJwtException e){
            log.error("refreshToken 만료", e);
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(new ResponseDto(HttpStatus.BAD_REQUEST, "refreshToken 만료", null), HttpStatus.BAD_REQUEST);
        }catch (Exception e){
            log.error("잘못된 token", e);
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(new ResponseDto(HttpStatus.BAD_REQUEST, "잘못된 Token", null), HttpStatus.BAD_REQUEST);
        }
//        return new ResponseEntity<>(HttpStatus.OK);
        return new ResponseEntity<>(new ResponseDto(HttpStatus.OK, "토큰 재발급", tokenResDto), HttpStatus.CREATED);
    }
}
