package com.sun.tingle.member.api.service;

import com.sun.tingle.member.api.dto.request.PasswordCodeDto;

public interface EmailService {

    void sendId(String email, String memberId);

    String SendPasswordCode(String email, String name);

    boolean validatePasswordCode(PasswordCodeDto passwordCodeDto);
}
 