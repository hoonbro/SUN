package com.sun.tingle.member.api.controller;

import com.sun.tingle.member.api.dto.request.MemberReqDto;
import com.sun.tingle.member.api.dto.response.MemberResDto;
import com.sun.tingle.member.api.service.MemberService;
import com.sun.tingle.member.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/members")
@CrossOrigin("*")
public class MemberController {
    @Autowired
    MemberService memberService;

    @Autowired
    JwtUtil jwtUtil;

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

    @PutMapping("/profile-image")
    public ResponseEntity<?> updateProfileImage(HttpServletRequest request, @RequestParam("image") MultipartFile file) throws IOException {
        String token =request.getHeader(HttpHeaders.AUTHORIZATION);
        Long id = jwtUtil.getIdFromJwt(token.substring("Bearer ".length()));

        String url = memberService.updateProfileImage(id, file);

        Map<String, String> map = new HashMap<>();
        map.put("url", url);
        return new ResponseEntity<>(map, HttpStatus.CREATED);
    }

    @DeleteMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request){
        String refreshToken =request.getHeader("refreshToken");
        try {
            memberService.logout(refreshToken);
            log.info("로그아웃 완료");
        }catch(Exception e){
            log.info("존재하지 않는 refresh 토큰");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
