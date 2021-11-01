package com.sun.tingle.member.db.entity;

import com.sun.tingle.calendar.db.entity.CalendarEntity;
import com.sun.tingle.calendar.db.entity.ShareCalendarEntity;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@Builder
@Getter
@Table(name = "member")
public class MemberEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //기본키 생성을 db에 위임하는 방법(auto increment)
    private Long id;

    private String memberId;
    private String email;
    private String password;
    private String name;
    private String phone;
    private String profileImage;
    private String auth;
    private String defaultCalendar;

    public MemberEntity(Long id, String memberId, String email, String password, String name, String phone, String profileImage, String auth, String defaultCalendar) {
        this.id = id;
        this.memberId = memberId;
        this.email = email;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.profileImage = profileImage;
        this.auth = auth;
        this.defaultCalendar = defaultCalendar;
    }

    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL)
    private List<CalendarEntity> calendarEntities = new ArrayList<>();
}
 