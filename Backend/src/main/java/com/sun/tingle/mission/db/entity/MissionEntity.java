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

    @Column(name="mission_name")
    String missionName;
    @Column(name="start_date")
    String startDate;
    @Column(name="start_time")
    String startTime;
    @Column(name="end_date")
    String endDate;
    @Column(name="end_time")
    String endTime;
    @Column(name="tag")
    String tag;
    @Column(name="calendar_code")
    String calendarCode;



}
