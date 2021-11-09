package com.sun.tingle.member.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TokenInfo {
    private long id;
    private String email;
    private String name;
}
