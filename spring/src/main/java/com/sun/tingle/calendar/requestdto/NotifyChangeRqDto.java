package com.sun.tingle.calendar.requestdto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class NotifyChangeRqDto {
    String calendarCode;
    String type;
    Long missionId;
}