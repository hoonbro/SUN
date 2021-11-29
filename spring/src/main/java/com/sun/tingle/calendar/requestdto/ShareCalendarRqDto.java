package com.sun.tingle.calendar.requestdto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ShareCalendarRqDto {
    private String calendarCode;
    private Long notificationId;
}
