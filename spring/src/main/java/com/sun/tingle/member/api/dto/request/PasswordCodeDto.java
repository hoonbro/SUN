package com.sun.tingle.member.api.dto.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PasswordCodeDto {
    private String email;
    private String code;
}
