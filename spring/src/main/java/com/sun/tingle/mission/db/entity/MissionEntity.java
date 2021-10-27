package com.sun.tingle.mission.db.entity;


import lombok.*;
import org.hibernate.annotations.Columns;

import javax.persistence.*;

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



}
