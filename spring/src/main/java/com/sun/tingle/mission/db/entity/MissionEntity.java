package com.sun.tingle.mission.db.entity;


import com.sun.tingle.calendar.db.entity.ShareCalendarEntity;
import com.sun.tingle.file.db.entity.MissionFileEntity;
import lombok.*;
import org.hibernate.annotations.Columns;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "mission")
public class MissionEntity {

    @Id
    @Column(name = "mission_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long missionId;
    @Column(name="name")
    String name;
    @Column(name="start")
    String start;
    @Column(name="end")
    String end;
    @Column(name="tag")
    String tag;
    @Column(name="calendar_code")
    String calendarCode;


    @OneToMany(mappedBy = "missionId", cascade = CascadeType.ALL)
    List<MissionFileEntity> missions = new ArrayList<>();



}
