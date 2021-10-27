package com.sun.tingle.member.db.entity;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@Builder
@Table(name = "token")
public class TokenEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //기본키 생성을 db에 위임하는 방법(auto increment)
    private Long id;

    @Column(name = "refresh_token",  unique=true)
    private String refreshToken;

    @Column(name = "mid")
    private Long mid;

    @Column(name = "expire_time")
    private Long expireTime;
}
