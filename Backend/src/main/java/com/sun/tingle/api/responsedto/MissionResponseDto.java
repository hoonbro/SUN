package com.sun.tingle.api.responsedto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
public class MissionResponseDto {
    String teacherId;
    String title;
    String memo;
}
