package com.sun.tingle.calendar.db.repo;

import com.sun.tingle.calendar.db.entity.ShareCalendarEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShareCalendarRepository extends JpaRepository<ShareCalendarEntity,String> {
    public ShareCalendarEntity findByCalendarCodeAndMemberId(String calendarCode,String memberId);
}
