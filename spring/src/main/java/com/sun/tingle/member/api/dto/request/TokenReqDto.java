package com.sun.tingle.member.api.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenReqDto {
    private String accessToken;
    private String refreshToken;
}
