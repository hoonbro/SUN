package com.sun.tingle.calendar.db.repo;

import com.sun.tingle.calendar.db.entity.CalendarEntity;
import com.sun.tingle.calendar.db.entity.ShareCalendarEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShareCalendarRepository extends JpaRepository<ShareCalendarEntity,String> {
    public ShareCalendarEntity findByCalendarCodeAndId(String calendarCode,long id);
    public List<ShareCalendarEntity> findCalendarCodeById(long id);
    @Query("select c.id from ShareCalendarEntity c where c.calendarCode =?1")
    List<Long> findIdByCalendarCode(String calendarCode);
}
