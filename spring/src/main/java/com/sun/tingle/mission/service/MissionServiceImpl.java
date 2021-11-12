package com.sun.tingle.mission.service;

import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.sun.tingle.calendar.db.entity.CalendarEntity;
import com.sun.tingle.calendar.db.repo.CalendarRepository;
import com.sun.tingle.calendar.responsedto.CalendarRpDto;
import com.sun.tingle.calendar.service.CalendarService;
import com.sun.tingle.file.db.entity.TeacherFileEntity;
import com.sun.tingle.file.db.repo.TeacherFileRepository;
import com.sun.tingle.file.service.S3service;
import com.sun.tingle.mission.db.entity.MissionEntity;
import com.sun.tingle.mission.db.repo.MissionRepository;
import com.sun.tingle.mission.requestdto.MissionRqDto;
import com.sun.tingle.mission.responsedto.MissionRpDto;
import com.sun.tingle.notification.api.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Service
public class MissionServiceImpl implements MissionService {
    @Autowired
    MissionRepository missionRepository;

    @Autowired
    TeacherFileRepository teacherFileRepository;
    @Autowired
    CalendarRepository calendarRepository;

    @Autowired
    NotificationService notificationService;

    @Autowired
    CalendarService calendarService;

    @Autowired
    S3service s3service;

    @Override
    public MissionRpDto insertMission(MissionRqDto missionRqDto, MultipartFile[] teacherFile) throws IOException, ParseException {
        CalendarEntity calendarEntity = calendarRepository.findByCalendarCode(missionRqDto.getCalendarCode());
//        if(calendarEntity.getId() != missionRqDto.getId()) {
//            return null;
//        }



        MissionEntity missionEntity = new MissionEntity();
        missionEntity.setTitle(missionRqDto.getTitle());
        missionEntity.setStartDate(stringToDate(missionRqDto.getStart().split("T")[0]));
        missionEntity.setStartTime(missionRqDto.getStart().split("T")[1]);
        missionEntity.setEndDate(stringToDate(missionRqDto.getEnd().split("T")[0]));
        missionEntity.setEndTime(missionRqDto.getEnd().split("T")[1]);
        missionEntity.setCalendarCode(missionRqDto.getCalendarCode());
        missionEntity.setId(missionRqDto.getId());
        List<String> list = missionRqDto.getTag();
        StringBuilder sb = new StringBuilder();
        int size = (list !=null) ? list.size():0;
        for(int i=0; i<size; i++) {
            String temp = list.get(i);
            sb.append("&@&").append(temp); // 있는 그대로 넣기
        }
        missionEntity.setTag(sb.toString());
        missionEntity = missionRepository.save(missionEntity);

        notificationService.sendNotifyChange(missionRqDto.getId(),missionEntity.getCalendarCode(),"mission_create",missionEntity.getMissionId());

        String[] tagArr = missionEntity.getTag().split("&@&");
        list = new ArrayList<>();
        size = tagArr.length;
        for(int i=1; i<size; i++) {
            list.add(tagArr[i]);
            System.out.println(tagArr[i]);
        }

        if(teacherFile != null) {
            s3service.teacherFileUploads(teacherFile,missionEntity.getMissionId(),missionEntity.getId());
        }
        MissionRpDto missionRpDto = new MissionRpDto();

        missionRpDto = missionRpDto.builder().missionId(missionEntity.getMissionId())
                .tag(list).title(missionEntity.getTitle())
                .calendarCode(missionEntity.getCalendarCode())
                .start(dateToString(missionEntity.getStartDate())+"T"+missionEntity.getStartTime())
                .end(dateToString(missionEntity.getEndDate())+"T"+missionEntity.getEndTime())
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
        String[] tagArr = missionEntity.getTag().split("&@&");
        List<String> list = new ArrayList<>();
        int size = tagArr.length;
        for(int i=1; i<size; i++) {
            list.add(tagArr[i]);
        }

        missionRpDto = missionRpDto.builder().missionId(missionEntity.getMissionId())
                .tag(list).title(missionEntity.getTitle())
                .calendarCode(missionEntity.getCalendarCode())
                .start(dateToString(missionEntity.getStartDate())+"T"+missionEntity.getStartTime())
                .end(dateToString(missionEntity.getEndDate())+"T"+missionEntity.getEndTime())
                .id(missionEntity.getId())
                .missionFileList(missionEntity.getMissionFileList()).
                        teacherFileList(missionEntity.getTeacherFileList()).build();




        return missionRpDto;
    }

    @Override
    public MissionRpDto updateMission(Long missionId,MissionRqDto missionRqDto,MultipartFile[] teacherFile) throws IOException, ParseException {
        MissionEntity missionEntity = missionRepository.findByMissionId(missionId);
        if(missionEntity == null) { //미션이 없을 때
            return null;
        }

        MissionRpDto missionRpDto = new MissionRpDto();
//        if(missionEntity.getId() != missionRqDto.getId()) { // 권한 없을 때
//            return missionRpDto;
//        }

        List<TeacherFileEntity> list2 = teacherFileRepository.findByMissionId(missionId);
        int file_size = (list2 != null) ? list2.size():0;

        for(int i=0; i<file_size; i++) { // 업데이트전 db 파일 삭제
            Long fileId = list2.get(i).getFileId();
            teacherFileRepository.deleteById(fileId);
            s3service.deleteTeacherFile(list2.get(i).fileUuid,list2.get(i).getId());
        }

        if(teacherFile != null) {
            s3service.teacherFileUploads(teacherFile,missionId,missionRqDto.getId());
        }




        List<String> list = missionRqDto.getTag();
        if(list == null) {
            list = new ArrayList<>();
        }
        int size = (list != null) ? list.size():0;
        StringBuilder sb = new StringBuilder();

        for(int i=0; i<size; i++) {

            sb.append("&@&").append(list.get(i));
        }

        missionEntity = new MissionEntity(missionId,missionRqDto.getTitle(),stringToDate(missionRqDto.getStart().split("T")[0]),
                missionRqDto.getStart().split("T")[1],
                stringToDate(missionRqDto.getEnd().split("T")[0]),missionRqDto.getEnd().split("T")[1],
                sb.toString(),missionRqDto.getCalendarCode(),missionRqDto.getId());


        missionEntity = missionRepository.save(missionEntity);
        notificationService.sendNotifyChange(missionRqDto.getId(),missionEntity.getCalendarCode(),"mission_update",missionEntity.getMissionId());

        missionRpDto = missionRpDto.builder().missionId(missionEntity.getMissionId())
                .title(missionEntity.getTitle())
                .start(dateToString(missionEntity.getStartDate())+"T"+missionEntity.getStartTime())
                .end(dateToString(missionEntity.getEndDate())+"T"+missionEntity.getEndTime())
                .tag(list).
                id(missionEntity.getId()).
                calendarCode(missionEntity.getCalendarCode()).
//                missionFileList(missionEntity.getMissionFileList()).
//                teacherFileList(missionEntity.getTeacherFileList()).
        build();

        return missionRpDto;
    }

    @Override
    public int deleteMission(Long missionId,Long id) {
        int result = 0;
        MissionEntity missionEntity = missionRepository.findByMissionId(missionId);
//        if(missionEntity.getId() == id) {
            s3service.s3MissionDelete(missionId);
            missionRepository.deleteById(missionId);
//            result = 1;
//        }
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

    @Override
    public List<MissionRpDto> selectDateMissionList(String missionDate,String calendarCode) throws ParseException {
        Date mDate = stringToDate(missionDate);

        List<MissionEntity> list = missionRepository.findByCalendarCodeAndStartDateLessThanEqualAndEndDateGreaterThanEqual(calendarCode,mDate,mDate);

        List<MissionRpDto> list2 = builderMissionList(list);

        return list2;
    }

    @Override
    public List<Long> getMemberMissionList(Long id) {
        List<CalendarRpDto> list = calendarService.getMyCalendarList(id);
        List<CalendarRpDto> list2 = calendarService.getShareCalendarList(id);
        List<Long> missionList = new ArrayList<>();
        list.addAll(list2);

        int size = list.size();
        int size2 = 0;
        for(int i=0; i<size; i++) {
            List<MissionEntity> list3 = missionRepository.findByCalendarCode(list.get(i).getCalendarCode());
            size2 = list3.size();
            for(int j=0; j<size2; j++) {
                missionList.add(list3.get(j).getMissionId());
            }
        }

        Collections.sort(missionList);
        return missionList;
    }


    public List<MissionRpDto> builderMissionList(List<MissionEntity> list) {
        List<MissionRpDto> list2 = new ArrayList<>();
        MissionEntity m = new MissionEntity();
        MissionRpDto missionRpDto = new MissionRpDto();
        int size = list.size();
        List<String> tags = null;
        for(int i=0; i<size; i++) {
            m = list.get(i);
            String[] temp = m.getTag().split("&@&");
            tags = new ArrayList<>();
            for(int j=0;j<temp.length;j++) {
                if(temp[j].equals("")) {
                    continue;
                }
                tags.add(temp[j]);
            }
            missionRpDto = missionRpDto.builder().calendarCode(m.getCalendarCode())
                    .missionId(m.getMissionId())
                    .title(m.getTitle())
                    .end(dateToString(m.getEndDate())+"T"+m.getEndTime())
                    .start(dateToString(m.getStartDate())+"T"+m.getStartTime())
                    .tag(tags)
                    .id(m.getId())
                    .missionFileList(m.getMissionFileList())
                    .teacherFileList(m.getTeacherFileList())
                    .build();
            list2.add(missionRpDto);
        }

        return list2;
    }


    public Date stringToDate(String dateA) throws ParseException {
        SimpleDateFormat transFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date sToDate = transFormat.parse(dateA);
        return sToDate;

    }

    public String dateToString(Date d) {
        SimpleDateFormat transFormat = new SimpleDateFormat("yyyy-MM-dd");
        String dToString = transFormat.format(d);
        return dToString;

    }

}
