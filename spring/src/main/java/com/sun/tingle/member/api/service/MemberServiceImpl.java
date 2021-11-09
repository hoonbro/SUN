package com.sun.tingle.member.api.service;

import com.sun.tingle.calendar.db.repo.CalendarRepository;
import com.sun.tingle.calendar.service.CalendarService;
import com.sun.tingle.file.service.S3service;
import com.sun.tingle.member.api.dto.request.MemberReqDto;
import com.sun.tingle.member.api.dto.response.MemberResDto;
import com.sun.tingle.member.db.entity.MemberEntity;
import com.sun.tingle.member.db.repository.MemberRepository;
import com.sun.tingle.member.db.repository.TokenRepository;
import com.sun.tingle.member.util.JwtUtil;
import com.sun.tingle.member.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;

    private final S3service s3service;

    private final RedisUtil redisUtil;

    @Override
    public MemberResDto getMemberInfo(Long id) {
        MemberEntity memberEntity = memberRepository.findById(id).orElseThrow(NoSuchElementException::new);
        return entity2Dto(memberEntity);
    }

    @Override
    @Transactional
    public MemberResDto updateMemberInfo(Long id, MemberReqDto memberReqDto) {
        MemberEntity memberEntity = getMemberById(id).orElseThrow(NoSuchElementException::new);
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
                .defaultCalendar(memberEntity.getDefaultCalendar())
                .build();
        return memberResDto;
    }

    @Override
    public String updateProfileImage(Long id, MultipartFile file) throws IOException {
        MemberEntity memberEntity = getMemberById(id).orElseThrow(NoSuchElementException::new);

        // 새로운 프로필 이미지 url
//        String newUrl = s3service.ProfileUpload(file);
      String newUrl = s3service.s3upload(file);

        // s3에서 기존 프로필 이미지 삭제
        if(memberEntity.getProfileImage()!=null)
            s3service.deleteProfileFile(memberEntity.getProfileImage());

        //DB에 저장
        memberEntity.setProfileImage(newUrl);
        memberRepository.save(memberEntity);

        return newUrl;
    }

    @Override
    public void logout(String refreshToken){
        redisUtil.deleteData(refreshToken);
    }

    @Override
    public void changePassword(Long id, String password){
        MemberEntity memberEntity = getMemberById(id).orElseThrow(NoSuchElementException::new);
        memberEntity.setPassword(passwordEncoder.encode(password));
        memberRepository.save(memberEntity);
    }
}
