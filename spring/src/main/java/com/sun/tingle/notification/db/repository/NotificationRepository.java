package com.sun.tingle.notification.db.repository;

import com.sun.tingle.notification.db.entity.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {
}
