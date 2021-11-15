package com.sun.tingle.member.api.dto.response;

import com.sun.tingle.calendar.db.entity.CalendarEntity;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberResDto {
    private Long id;
    private String memberId;
    private String email;
    private String name;
    private String phone;
    private String profileImage;
    private String auth;
    private String defaultCalendar;
}
