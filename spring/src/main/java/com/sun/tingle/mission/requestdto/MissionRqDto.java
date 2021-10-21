package com.sun.tingle.mission.requestdto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MissionRqDto {
    String missionName;
    String startDate;
    String startTime;
    String endDate;
    String endTime;
    List<String> tag;
    String calendarCode;

}
