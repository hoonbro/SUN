package com.sun.tingle.mission.service;

import com.sun.tingle.mission.db.entity.MissionEntity;
import com.sun.tingle.mission.requestdto.MissionRqDto;
import com.sun.tingle.mission.responsedto.MissionRpDto;

public interface MissionService {
    public MissionRpDto insertMission(MissionRqDto missionRqDto);
    public MissionRpDto selectMission(Long missionId);
    public MissionRpDto updateMission(Long missionId, MissionRqDto missionRqDto);
    public void deleteMission(Long missionId);
}
