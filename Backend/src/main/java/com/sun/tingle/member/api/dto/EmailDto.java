package com.sun.tingle.member.api.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailDto {
    private String email;
    private String title;
    private String content;
}