package com.sun.tingle.member.api.controller;

import com.sun.tingle.member.api.dto.MemberDto;
import com.sun.tingle.member.api.service.EmailService;
import com.sun.tingle.member.api.service.MemberService;
import com.sun.tingle.member.db.entity.MemberEntity;
import com.sun.tingle.member.util.JwtUtil;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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
@RequestMapping("/members")
@CrossOrigin("*")
public class MemberController {
    @Autowired
    MemberService memberService;

    @Autowired
    EmailService emailService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<MemberEntity> registMember(@RequestBody MemberDto member){
        HttpStatus httpStatus = HttpStatus.CREATED;
        MemberEntity memberEntity;
        try {
            memberEntity = memberService.registMember(member);
            log.info("회원가입 성공");
        }catch(Exception e){
            httpStatus = HttpStatus.CONFLICT;
            log.error("회원가입 실패");
            return new ResponseEntity<>(httpStatus);
        }
        return new ResponseEntity<MemberEntity>(memberEntity, httpStatus);
    }

    @GetMapping("/duplicate-id/{id}")
    public ResponseEntity<Void> duplicateId(@PathVariable("id") String id){
        HttpStatus httpStatus = HttpStatus.OK;
        try{
            memberService.duplicateId(id);
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
            memberService.duplicateEmail(email);
            log.info("이메일 미중복");
        }catch (Exception e){
            httpStatus = HttpStatus.CONFLICT;
            log.error("이메일 중복");
            return new ResponseEntity<>(httpStatus);
        }

        return new ResponseEntity<>(httpStatus);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody MemberDto loginMember){
        Map<String, Object> map = new HashMap<String, Object>();
        HttpStatus httpStatus = HttpStatus.OK;

        try{
            Optional<MemberEntity> memberEntity = memberService.getMemberById(loginMember.getMemberId());
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

            String jwt = jwtUtil.createToken(loginMember.getMemberId());
            log.debug("로그인 토큰 정보 : {}", jwt);
            map.put("access-token", jwt);

        }catch(Exception e){
            httpStatus = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<Map<String, Object>>(map, httpStatus);
        }

        return new ResponseEntity<Map<String, Object>>(map, httpStatus);
    }

    @GetMapping("/invalid")
    public ResponseEntity<Boolean> tokenTest(HttpServletRequest request){
        HttpStatus httpStatus = HttpStatus.OK;
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        boolean auth = jwtUtil.validateToken(token.substring("Bearer ".length()));
        return new ResponseEntity<Boolean>(auth, httpStatus);
    }

    @PostMapping("/find-id")
    public ResponseEntity<Void> findId(@RequestBody MemberDto member){
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
    public ResponseEntity<Map<String, String>> SendPasswordCode(@RequestBody MemberDto member){
        HttpStatus httpStatus = HttpStatus.OK;
        Map<String, String> map = new HashMap<>();
        MemberEntity memberEntity;
        try {
            memberEntity = memberService.getMemberByEmail(member.getEmail());
            String code = emailService.SendPasswordCode(memberEntity.getEmail(), memberEntity.getName());
            map.put("code", code);
        }catch (NoSuchElementException e){
            httpStatus = HttpStatus.NOT_FOUND;
            log.error("존재하지 않는 이메일 : {}", e);
            return new ResponseEntity<Map<String, String>>(map, httpStatus);
        }
        return new ResponseEntity<Map<String, String>>(map, httpStatus);
    }

    @PutMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@RequestBody MemberDto member){
        HttpStatus httpStatus = HttpStatus.CREATED;

        MemberEntity memberEntity;
        try {
            memberEntity = memberService.getMemberByEmail(member.getEmail());
            memberService.changePassword(memberEntity, member.getPassword());
        }catch (NoSuchElementException e){
            httpStatus = HttpStatus.NOT_FOUND;
            log.error("존재하지 않는 이메일 : {}", e);
            return new ResponseEntity<>(httpStatus);
        }
        return new ResponseEntity<>(httpStatus);
    }
}
