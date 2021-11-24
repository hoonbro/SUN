package com.sun.tingle.mission.requestdto;


import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MissionRqDto {
    String title;
    String start;
    String end;
    List<String> teacherFileList;
    List<String> tag;
    String calendarCode;
    Long id;
}
