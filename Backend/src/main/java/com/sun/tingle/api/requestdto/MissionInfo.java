package com.sun.tingle.api.requestdto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class MissionInfo {
    String teacherId;
    String title;
    String memo;
    Date registerDate;
}
