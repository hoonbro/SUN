package com.sun.tingle.mission.db.entity;


import com.sun.tingle.calendar.db.entity.ShareCalendarEntity;
import com.sun.tingle.file.db.entity.MissionFileEntity;
import com.sun.tingle.file.db.entity.TeacherFileEntity;
import lombok.*;
import org.hibernate.annotations.Columns;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "mission")
public class MissionEntity {

    @Id
    @Column(name = "mission_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long missionId;
    @Column(name="title")
    String title;
    @Column(name="start")
    String start;
    @Column(name="end")
    String end;
    @Column(name="tag")
    String tag;
    @Column(name="calendar_code")
    String calendarCode;

    @Column(name="id")
    Long id;


    @OneToMany(mappedBy = "missionId", cascade = CascadeType.ALL)
    private List<MissionFileEntity> missionFileList = new ArrayList<>();

    @OneToMany(mappedBy = "missionId", cascade = CascadeType.ALL)
    private List<TeacherFileEntity> teacherFileList = new ArrayList<>();

    public MissionEntity(Long missionId, String title, String start, String end, String toString, String calendarCode, Long id) {
        this.missionId = missionId;
        this.title = title;
        this.start = start;
        this.end = end;
        this.tag = toString;
        this.calendarCode = calendarCode;
        this.id = id;

    }



}
