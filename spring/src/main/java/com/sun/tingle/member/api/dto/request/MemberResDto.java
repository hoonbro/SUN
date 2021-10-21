package com.sun.tingle.member.api.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberDto {
    private Long id;
    private String memberId;
    private String password;
    private String email;
    private String name;
    private String phone;
    private String auth;
} 
