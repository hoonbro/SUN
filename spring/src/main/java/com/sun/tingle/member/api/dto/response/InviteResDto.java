package com.sun.tingle.member.api.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InviteResDto {
    private String calenderCode;
    private String senderName;
}
