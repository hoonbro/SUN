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
        MemberEntity memberEntity = memberService.registMember(member);
        return new ResponseEntity<MemberEntity>(memberEntity, httpStatus);
    }

    @GetMapping("/duplicate-id/{id}")
    public ResponseEntity<Void> duplicateId(@PathVariable("id") String id){
        HttpStatus httpStatus = HttpStatus.OK;
        try{
            memberService.duplicateId(id);
        }catch (Exception e){
            httpStatus = HttpStatus.CONFLICT;
            return new ResponseEntity<>(httpStatus);
        }

        return new ResponseEntity<>(httpStatus);
    }

    @GetMapping("/duplicate-email/{email}")
    public ResponseEntity<Void> duplicateEmail(@PathVariable("email") String email){
        HttpStatus httpStatus = HttpStatus.OK;
        try{
            memberService.duplicateEmail(email);
        }catch (Exception e){
            httpStatus = HttpStatus.CONFLICT;
            return new ResponseEntity<>(httpStatus);
        }

        return new ResponseEntity<>(httpStatus);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody MemberDto loginMember){
        Map<String, Object> map = new HashMap<String, Object>();
        HttpStatus httpStatus = HttpStatus.CREATED;

        try{
            Optional<MemberEntity> memberEntity = memberService.getMemberById(loginMember.getMemberId());
            //아이디가 없는 경우
            if(memberEntity == null) {
                httpStatus = HttpStatus.UNAUTHORIZED;
                map.put("error", "Invalid ID");
                return new ResponseEntity<Map<String, Object>>(map, httpStatus);
            }
            //비밀번호가 틀린경우
            if(!passwordEncoder.matches(memberEntity.get().getPassword(), loginMember.getPassword())){
                httpStatus = HttpStatus.UNAUTHORIZED;
                map.put("error", "Wrong password");
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
