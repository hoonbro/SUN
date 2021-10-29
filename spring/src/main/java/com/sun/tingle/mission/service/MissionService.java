package com.sun.tingle.mission.service;

import com.sun.tingle.mission.db.entity.MissionEntity;
import com.sun.tingle.mission.requestdto.MissionRqDto;
import com.sun.tingle.mission.responsedto.MissionRpDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface MissionService {
    public MissionRpDto insertMission(MissionRqDto missionRqDto, MultipartFile[] teacherFile) throws IOException;
    public MissionRpDto selectMission(Long missionId);
    public MissionRpDto updateMission(Long missionId, MissionRqDto missionRqDto);
    public void deleteMission(Long missionId);
    public List<MissionRpDto> selectMissionList(String calendarCode);
}
