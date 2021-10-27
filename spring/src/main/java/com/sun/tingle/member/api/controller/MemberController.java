package com.sun.tingle.member.api.controller;

import com.sun.tingle.member.api.dto.request.MemberReqDto;
import com.sun.tingle.member.api.dto.request.TokenReqDto;
import com.sun.tingle.member.api.dto.response.MemberResDto;
import com.sun.tingle.member.api.dto.response.TokenResDto;
import com.sun.tingle.member.api.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequestMapping("/members")
@CrossOrigin("*")
public class MemberController {
    @Autowired
    MemberService memberService;

    @GetMapping("/{id}")
    public ResponseEntity<MemberResDto> getMemberInfo(@PathVariable Long id){
        HttpStatus httpStatus = HttpStatus.OK;
        MemberResDto memberResDto;
        try {
            memberResDto = memberService.getMemberInfo(id);
            log.info("회원정보 조회 성공");
        }catch(Exception e){
            httpStatus = HttpStatus.NOT_FOUND;
            log.error("회원정보 조회 실패");
            return new ResponseEntity<>(httpStatus);
        }
        return new ResponseEntity<MemberResDto>(memberResDto, httpStatus);
    }

    @PutMapping
    public ResponseEntity<MemberResDto> updateMemberInfo(@RequestBody MemberReqDto memberReqDto){
        HttpStatus httpStatus = HttpStatus.CREATED;
        MemberResDto memberResDto;

        try{
            memberResDto = memberService.updateMemberInfo(memberReqDto);
            log.info("회원정보 수정 성공");
        }catch(Exception e){
            httpStatus = HttpStatus.NOT_FOUND;
            log.error("존재하지 않는 회원");
            return new ResponseEntity<>(httpStatus);
        }

        return new ResponseEntity<MemberResDto>(memberResDto, httpStatus);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMemberInfo(@PathVariable Long id){
        HttpStatus httpStatus = HttpStatus.NO_CONTENT;

        try{
            memberService.deleteMemberInfo(id);
            log.info("회원정보 삭제 성공");
        }catch(Exception e){
            httpStatus = HttpStatus.NOT_FOUND;
            log.error("존재하지 않는 회원 : {}", e);
            return new ResponseEntity<>(httpStatus);
        }

        return new ResponseEntity<>( httpStatus);
    }

    @GetMapping("/invalid")
    public ResponseEntity<Boolean> tokenTest(HttpServletRequest request){
        HttpStatus httpStatus = HttpStatus.OK;
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
//        boolean auth = jwtUtil.validateToken(token.substring("Bearer ".length()));
        return new ResponseEntity<>(httpStatus);
    }



    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(@RequestBody TokenReqDto tokenReqDto){
        TokenResDto tokenResDto = memberService.reissue(tokenReqDto);
        return new ResponseEntity<>(tokenResDto, HttpStatus.CREATED);
    }
}
