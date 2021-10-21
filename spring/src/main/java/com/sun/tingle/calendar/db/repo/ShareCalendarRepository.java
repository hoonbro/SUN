package com.sun.tingle.calendar.db.repo;

import com.sun.tingle.calendar.db.entity.CalendarEntity;
import com.sun.tingle.calendar.db.entity.ShareCalendarEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShareCalendarRepository extends JpaRepository<ShareCalendarEntity,String> {
    public ShareCalendarEntity findByCalendarCodeAndMemberId(String calendarCode,String memberId);
    public List<ShareCalendarEntity> findCalendarCodeByMemberId(String memberId);

}
