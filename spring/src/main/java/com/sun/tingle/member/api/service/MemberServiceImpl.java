package com.sun.tingle.member.api.service;

import com.sun.tingle.member.api.dto.request.MemberReqDto;
import com.sun.tingle.member.api.dto.response.MemberResDto;
import com.sun.tingle.member.db.entity.MemberEntity;
import com.sun.tingle.member.db.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class MemberServiceImpl implements MemberService {
    @Autowired
    MemberRepository memberRepository;

    @Autowired
    PasswordEncoder passwordEncoder;
 
    @Override
    public MemberResDto registMember(MemberReqDto member) {
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

        return entity2Dto(memberEntity);
    }

    @Override
    public MemberResDto getMemberInfo(Long id) {
        MemberEntity memberEntity = memberRepository.findById(id).orElseThrow(NoSuchElementException::new);
        return entity2Dto(memberEntity);
    }

    @Override
    @Transactional
    public MemberResDto updateMemberInfo(MemberReqDto memberReqDto) {
        MemberEntity memberEntity = getMemberById(memberReqDto.getId()).orElseThrow(NoSuchElementException::new);
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
    public void changePassword(MemberEntity memberEntity, String password) {
        memberEntity.setPassword(passwordEncoder.encode(password));
        memberRepository.save(memberEntity);
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
                .build();
        return memberResDto;
    }
}
