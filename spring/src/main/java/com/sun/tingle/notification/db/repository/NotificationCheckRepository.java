package com.sun.tingle.notification.db.repository;

import com.sun.tingle.notification.db.entity.NotificationCheckEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationCheckRepository  extends JpaRepository<NotificationCheckEntity, Long> {
    NotificationCheckEntity findByNotificationIdAndMemberId(Long notificationId, Long memberId);
}
