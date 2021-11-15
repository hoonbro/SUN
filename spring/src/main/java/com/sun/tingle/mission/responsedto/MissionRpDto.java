package com.sun.tingle.mission.responsedto;

import com.sun.tingle.file.db.entity.MissionFileEntity;
import com.sun.tingle.file.db.entity.TeacherFileEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MissionRpDto {

    private Long missionId;
    private String title;
    private String start;
    private  String end;
    private  List<String> tag;
    private  String calendarCode;
    private Long id;

    private List<MissionFileEntity> missionFileList = new ArrayList<>();

    private List<TeacherFileEntity> teacherFileList = new ArrayList<>();
}
