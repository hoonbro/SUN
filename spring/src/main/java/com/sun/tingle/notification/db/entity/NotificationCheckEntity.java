package com.sun.tingle.notification.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
@Builder
@Table(name = "notification_check")
public class NotificationCheckEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //기본키 생성을 db에 위임하는 방법(auto increment)
    private Long id;

    private Long notificationId;

    @Column(columnDefinition = "boolean default false")
    private Boolean isCheck;

    private Long memberId;
}
