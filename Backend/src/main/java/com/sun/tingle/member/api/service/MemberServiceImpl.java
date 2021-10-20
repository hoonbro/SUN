package com.sun.tingle.member.api.service;

import com.sun.tingle.member.api.dto.MemberDto;
import com.sun.tingle.member.db.entity.MemberEntity;
import com.sun.tingle.member.db.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class MemberServiceImpl implements MemberService {
    @Autowired
    MemberRepository memberRepository;

    @Autowired
    PasswordEncoder passwordEncoder;
 
    @Override
    public MemberEntity registMember(MemberDto member) {
        MemberEntity memberEntity = MemberEntity.builder()
                .memberId(member.getMemberId())
                .password(passwordEncoder.encode(member.getPassword()))
                .name(member.getName())
                .phone(member.getPhone())
                .email(member.getEmail())
                .auth("ROLE_USER")
                .build();

        return memberRepository.save(memberEntity);
    }

    @Override
    public void duplicateId(String id) {
        memberRepository.findByMemberId(id)
                .ifPresent(m -> {
                    throw new IllegalStateException("중복되는 아이디 입니다");
                });


    }

    @Override
    public void duplicateEmail(String email) {
//        Optional<MemberEntity> memberOptional = memberRepository.findByEmail(email);

//        MemberEntity memberEntity = memberRepository.findByEmail(email);
        memberRepository.findByEmail(email)
                .ifPresent(m -> {
                    throw new IllegalStateException("중복되는 이메일 입니다");
                });
    }

    @Override
    public Optional<MemberEntity> getMemberById(String memberId) {
        return memberRepository.findByMemberId(memberId);
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
}
