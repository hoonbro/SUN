package com.sun.tingle.member.api.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Slf4j
@Service
public class EmailServiceImpl implements EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    MemberService memberService;

    @Override
    public void sendId(String email, String memberId) {
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
            messageHelper.setFrom("Tingle@gmail.com");
            messageHelper.setTo(email);
            messageHelper.setSubject("Tingle 아이디 찾기 안내");
            messageHelper.setText(  "<html><body><div style=\"display: flex; flex-direction: column;\"> \n" +
                    "<h1>Tingle</h1>\n" +
                    "<h2>아이디 찾기 결과입니다.</h2>\n" +
                    "<span>아이디 : "+memberId+"</span>\n" +
                    "</div></body></html>", true);

            javaMailSender.send(message);
        }catch(MessagingException e){
            log.error("가입 메일 발송 실패 :{}", e);
        }
    }
}
