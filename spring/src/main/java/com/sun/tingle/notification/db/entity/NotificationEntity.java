package com.sun.tingle.notification.db.entity;

import com.sun.tingle.mission.db.entity.MissionEntity;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

//@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
//@DynamicUpdate
//@DynamicInsert
@Builder
@Getter
@Setter
@Table(name = "notification")
public class NotificationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //기본키 생성을 db에 위임하는 방법(auto increment)
    private Long id;

    private String type;

    private String calendarCode;

//    private Long missionId;

    private Long senderId;

    private Long receiverId;

    @Column(columnDefinition = "boolean default false")
    private Boolean isCheck;

    @Temporal(TemporalType.TIME)
    Date sendTime;

    @Temporal(TemporalType.DATE)
    Date sendDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mission_id", referencedColumnName = "mission_id")
    private MissionEntity missionEntity;
}
