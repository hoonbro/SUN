package com.sun.tingle.member.api.controller;

import com.sun.tingle.member.api.dto.MemberDto;
import com.sun.tingle.member.api.service.MemberService;
import com.sun.tingle.member.db.entity.MemberEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/members")
@CrossOrigin("*")
public class MemberController {
    @Autowired
    MemberService memberService;

    @Autowired
    PasswordEncoder passwordEncoder;

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
                httpStatus = HttpStatus.UNAUTHORIZED;
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


        }catch(Exception e){
            httpStatus = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<Map<String, Object>>(map, httpStatus);
        }

        return new ResponseEntity<Map<String, Object>>(map, httpStatus);
    }

    @GetMapping("/test/{id}")
    public ResponseEntity<Optional<MemberEntity>> test(@PathVariable String id){
        HttpStatus httpStatus = HttpStatus.OK;
        Optional<MemberEntity> memberEntity = memberService.getMemberById(id);
        return new ResponseEntity<Optional<MemberEntity>>(memberEntity, httpStatus);
    }
}
