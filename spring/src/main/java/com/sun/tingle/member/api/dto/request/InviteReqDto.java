package com.sun.tingle.member.api.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InviteReqDto {
    private String inviteeEmail;
    private String calendarCode;
}
