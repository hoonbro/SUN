package com.sun.tingle.member.api.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenResDto {
    private String accessToken;
    private String refreshToken;
}