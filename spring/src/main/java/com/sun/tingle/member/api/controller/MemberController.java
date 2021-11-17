package com.sun.tingle.member.api.controller;

import com.sun.tingle.member.api.dto.TokenInfo;
import com.sun.tingle.member.api.dto.request.InviteReqDto;
import com.sun.tingle.member.api.dto.request.MemberReqDto;
import com.sun.tingle.member.api.dto.response.MemberResDto;
import com.sun.tingle.member.api.service.MemberService;
import com.sun.tingle.member.db.entity.MemberEntity;
import com.sun.tingle.member.util.JwtUtil;
import com.sun.tingle.notification.api.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@Slf4j
@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MemberController {
    private final MemberService memberService;

    private final NotificationService notificationService;

    private final JwtUtil jwtUtil;

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
    public ResponseEntity<MemberResDto> updateMemberInfo(HttpServletRequest request, @RequestBody MemberReqDto memberReqDto){
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        Long id = jwtUtil.getIdFromJwt(token.substring("Bearer ".length()));

        HttpStatus httpStatus = HttpStatus.CREATED;
        MemberResDto memberResDto;

        try{
            memberResDto = memberService.updateMemberInfo(id, memberReqDto);
            log.info("회원정보 수정 성공");
        }catch(Exception e){
            httpStatus = HttpStatus.NOT_FOUND;
            log.error("존재하지 않는 회원");
            return new ResponseEntity<>(httpStatus);
        }

        return new ResponseEntity<MemberResDto>(memberResDto, httpStatus);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteMemberInfo(HttpServletRequest request){
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        Long id = jwtUtil.getIdFromJwt(token.substring("Bearer ".length()));
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
            log.info("로그아웃 성공");
        }catch(Exception e){
            log.info("존재하지 않는 refresh 토큰, 로그아웃 할 필요 없음");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/change-password")
    public ResponseEntity<Void> changePassword(HttpServletRequest request, @RequestBody MemberReqDto memberReqDto){
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        Long id = jwtUtil.getIdFromJwt(token.substring("Bearer ".length()));

        memberService.changePassword(id, memberReqDto.getPassword());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/invite")
    public ResponseEntity<?> invite(HttpServletRequest request, @RequestBody InviteReqDto inviteReqDto){
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        TokenInfo tokenInfo = jwtUtil.getClaimsFromJwt(token.substring("Bearer ".length()));


        MemberEntity memberEntity = null;
        try{
            memberEntity = memberService.getMemberByEmail(inviteReqDto.getInviteeEmail());
        }
        catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        try {
            notificationService.sendInvite(tokenInfo, inviteReqDto.getCalendarCode(), "invite", memberEntity.getId());
        }catch(Exception e){
            log.error("초대 알림 중복");
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
