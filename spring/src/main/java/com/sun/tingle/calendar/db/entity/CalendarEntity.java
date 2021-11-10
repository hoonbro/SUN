package com.sun.tingle.calendar.db.entity;


import com.sun.tingle.mission.db.entity.MissionEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "calendar")
public class CalendarEntity {

    @Id
    @Column(name="calendar_code")
    String calendarCode;

    @Column(name="calendar_name")
    String calendarName;

    @Column(name="id")
    Long id;

    @OneToMany(mappedBy = "calendarCode", cascade = CascadeType.ALL)
    private List<ShareCalendarEntity> ShareCalendar = new ArrayList<>();

    @OneToMany(mappedBy = "calendarCode", cascade = CascadeType.ALL)
    private List<MissionEntity> missionList = new ArrayList<>();

}
