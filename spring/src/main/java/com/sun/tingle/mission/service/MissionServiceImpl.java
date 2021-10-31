package com.sun.tingle.mission.service;

import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.sun.tingle.calendar.db.entity.CalendarEntity;
import com.sun.tingle.file.db.entity.TeacherFileEntity;
import com.sun.tingle.file.db.repo.TeacherFileRepository;
import com.sun.tingle.file.service.S3service;
import com.sun.tingle.mission.db.entity.MissionEntity;
import com.sun.tingle.mission.db.repo.MissionRepository;
import com.sun.tingle.mission.requestdto.MissionRqDto;
import com.sun.tingle.mission.responsedto.MissionRpDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class MissionServiceImpl implements MissionService {
    @Autowired
    MissionRepository missionRepository;

    @Autowired
    TeacherFileRepository teacherFileRepository;

    @Autowired
    S3service s3service;

    @Override
    public MissionRpDto insertMission(MissionRqDto missionRqDto, MultipartFile[] teacherFile) throws IOException {
        MissionEntity missionEntity = missionRepository.findByTitle(missionRqDto.getTitle());
        if(missionEntity != null) { // 이미 같은 미션 이름 있을 때
            return null;
        }

        missionEntity = new MissionEntity();
        missionEntity.setTitle(missionRqDto.getTitle());
        missionEntity.setStart(missionRqDto.getStart());
        missionEntity.setEnd(missionRqDto.getEnd());
        missionEntity.setCalendarCode(missionRqDto.getCalendarCode());
        missionEntity.setId(missionRqDto.getId());
        List<String> list = missionRqDto.getTag();
        StringBuilder sb = new StringBuilder();
        int size = list.size();

        for(int i=0; i<size; i++) {
            String temp = list.get(i);
//            temp = temp.replaceAll("\"","");
//            temp = temp.replaceAll("\\[","");
//            temp = temp.replaceAll("\\]","");


//            sb.append("#").append(temp); // #없이 넘어오실 시
            sb.append(temp); // #이랑 같이 리스트에 넘어올 떄
        }
        missionEntity.setTag(sb.toString());
        missionEntity = missionRepository.save(missionEntity);





        MissionRpDto missionRpDto = new MissionRpDto();
        String[] tagArr = missionEntity.getTag().split("#");
        list = new ArrayList<>();
        size = tagArr.length;
        for(int i=1; i<size; i++) {
            list.add(tagArr[i]);
        }
        s3service.teacherFileUploads(teacherFile,missionEntity.getMissionId(),missionEntity.getId());
        missionRpDto = missionRpDto.builder().missionId(missionEntity.getMissionId())
                .tag(list).title(missionEntity.getTitle())
                .calendarCode(missionEntity.getCalendarCode())
                .start(missionEntity.getStart())
                .end(missionEntity.getEnd())
                .id(missionEntity.getId())
//                .teacherFileList(missionEntity.getTeacherFileList()) 따로 조회
//                .missionFileList(missionEntity.getMissionFileList()) 따로 조회
                .build();




        return missionRpDto;
    }

    @Override
    public MissionRpDto selectMission(Long missionId) {
        MissionEntity missionEntity = missionRepository.findByMissionId(missionId);
        MissionRpDto missionRpDto = new MissionRpDto();
        String[] tagArr = missionEntity.getTag().split("#");
        List<String> list = new ArrayList<>();
        int size = tagArr.length;
        for(int i=1; i<size; i++) {
            list.add(tagArr[i]);
        }

        missionRpDto = missionRpDto.builder().missionId(missionEntity.getMissionId())
                .tag(list).title(missionEntity.getTitle())
                .calendarCode(missionEntity.getCalendarCode())
                .start(missionEntity.getStart())
                .end(missionEntity.getEnd())
                .id(missionEntity.getId())
                 .missionFileList(missionEntity.getMissionFileList()).
                teacherFileList(missionEntity.getTeacherFileList()).build();




        return missionRpDto;
    }

    @Override
    public MissionRpDto updateMission(Long missionId,MissionRqDto missionRqDto,MultipartFile[] teacherFile) throws IOException {
        MissionEntity missionEntity = missionRepository.findByMissionId(missionId);
        if(missionEntity == null) { //미션이 없을 때
            return null;
        }

        MissionRpDto missionRpDto = new MissionRpDto();
        if(missionEntity.getId() != missionRqDto.getId()) { // 권한 없을 때
            return missionRpDto;
        }

        List<TeacherFileEntity> list2 = teacherFileRepository.findByMissionId(missionId);
        int file_size = list2.size();

        for(int i=0; i<file_size; i++) { // 업데이트전 db 파일 삭제
             Long fileId = list2.get(i).getFileId();
             teacherFileRepository.deleteById(fileId);
             s3service.updateDeleteTeacherFile(list2.get(i).fileUuid);
        }

        s3service.teacherFileUploads(teacherFile,missionId,missionRqDto.getId());




        List<String> list = missionRqDto.getTag();
        int size = list.size();
        StringBuilder sb = new StringBuilder();

        for(int i=0; i<size; i++) {
            sb.append(list.get(i));
        }

        missionEntity = new MissionEntity(missionId,missionRqDto.getTitle(),missionRqDto.getStart(),
                missionRqDto.getEnd(),sb.toString(),missionRqDto.getCalendarCode(),missionRqDto.getId());


        missionEntity = missionRepository.save(missionEntity);

        missionRpDto = missionRpDto.builder().missionId(missionEntity.getMissionId())
                .title(missionEntity.getTitle())
                .start(missionEntity.getStart())
                .end(missionEntity.getEnd())
                .tag(missionRqDto.getTag()).
                id(missionEntity.getId()).
                calendarCode(missionEntity.getCalendarCode()).
                missionFileList(missionEntity.getMissionFileList()).
                teacherFileList(missionEntity.getTeacherFileList()).build();

        return missionRpDto;
    }

    @Override
    public int deleteMission(Long missionId,Long id) {
        int result = 0;
        MissionEntity missionEntity = missionRepository.findByMissionId(missionId);
        if(missionEntity.getId() == id) {
            missionRepository.deleteById(missionId);
            result = 1;
        }
        return result;
    }

    @Override
    public List<MissionRpDto> selectMissionList(String calendarCode) {
        List<MissionEntity> list = missionRepository.findByCalendarCode(calendarCode);
        if(list == null) {
            return null;
        }
        List<MissionRpDto> list2 = builderMissionList(list);

        return list2;
    }


    public List<MissionRpDto> builderMissionList(List<MissionEntity> list) {
        List<MissionRpDto> list2 = new ArrayList<>();
        MissionEntity m = new MissionEntity();
        MissionRpDto missionRpDto = new MissionRpDto();
        int size = list.size();
        List<String> tags = null;
        for(int i=0; i<size; i++) {
            m = list.get(i);
            String[] temp = m.getTag().split("#");
            tags = new ArrayList<>();
            for(int j=0;j<temp.length;j++) {
                tags.add(temp[j]);
            }
            missionRpDto = missionRpDto.builder().calendarCode(m.getCalendarCode())
                    .missionId(m.getMissionId())
                    .title(m.getTitle())
                    .end(m.getEnd())
                    .start(m.getStart())
                    .tag(tags)
                    .id(m.getId())
//                    .missionFileList(m.getMissionFileList())
//                    .teacherFileList(m.getTeacherFileList())
                    .build();
            list2.add(missionRpDto);
        }

        return list2;
    }
}
