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
    @Column(name="mission_name")
    String missionName;
    @Column(name="start_date")
    String startDate;
    @Column(name="end_date")
    String endDate;
    @Column(name="tag")
    String tag;
    @Column(name="calendar_code")
    String calendarCode;


    @OneToMany(mappedBy = "missionId", cascade = CascadeType.ALL)
    List<MissionFileEntity> missions = new ArrayList<>();



}
