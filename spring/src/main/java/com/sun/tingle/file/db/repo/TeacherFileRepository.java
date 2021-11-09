package com.sun.tingle.file.db.repo;

import com.sun.tingle.file.db.entity.MissionFileEntity;
import com.sun.tingle.file.db.entity.TeacherFileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherFileRepository extends JpaRepository<TeacherFileEntity,Long> {
    public List<TeacherFileEntity> findByMissionId(Long missionId);
    public TeacherFileEntity findByFileUuid(String Uuid);
}
