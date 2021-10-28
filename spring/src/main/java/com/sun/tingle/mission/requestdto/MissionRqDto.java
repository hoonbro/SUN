package com.sun.tingle.mission.requestdto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MissionRqDto {
    String title;
    String start;
    String end;
    List<String> tag;
    String calendarCode;
    MultipartFile[] teacherfile;
    Long id;
}
