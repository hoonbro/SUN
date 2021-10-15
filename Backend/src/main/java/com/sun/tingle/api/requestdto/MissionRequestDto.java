package com.sun.tingle.api.requestdto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class MissionRequestDto {
//    private MissionInfo missionInfo;
    private String teacherId;
    private String title;
//    private String memo;
//    private Date registerDate;
//    private MultipartFile missionFile;

}
