package com.sun.tingle.file.db.repo;

import com.sun.tingle.file.db.entity.MissionFileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MissionFileRepository extends JpaRepository<MissionFileEntity,Long> {
    public List<MissionFileEntity> findByMissionId(Long missionId);
}
