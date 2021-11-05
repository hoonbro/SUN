package com.sun.tingle.mission.controller;

import com.amazonaws.Response;
import com.sun.tingle.file.service.S3service;
import com.sun.tingle.member.util.JwtUtil;
import com.sun.tingle.mission.db.entity.MissionEntity;
import com.sun.tingle.mission.requestdto.MissionRqDto;
import com.sun.tingle.mission.responsedto.MissionRpDto;
import com.sun.tingle.mission.service.MissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/mission")
@CrossOrigin("*")
public class MissionController {
    @Autowired
    MissionService missionService;



    @Lazy
    @Autowired
    JwtUtil jwtUtil;



    @PostMapping
    public ResponseEntity<MissionRpDto> insertMission(HttpServletRequest request, @RequestParam("title") String title, @RequestParam("start") String start, @RequestParam("end") String end, @RequestParam(value = "teacherFile",required = false) MultipartFile[] teacherFile, @RequestParam(value = "tag",required = false) List<String> tag, @RequestParam("calendarCode") String calendarCode) throws IOException, ParseException {

        String token =request.getHeader(HttpHeaders.AUTHORIZATION);
        Long id = jwtUtil.getIdFromJwt(token.substring("Bearer ".length()));

        MissionRqDto missionRqDto = new MissionRqDto();
        missionRqDto = missionRqDto.builder().id(id).tag(tag).calendarCode(calendarCode).
                        start(start).end(end).title(title).build();

        MissionRpDto missionRpDto = missionService.insertMission(missionRqDto,teacherFile);


        if(missionRpDto == null) {
            return new ResponseEntity<MissionRpDto>(missionRpDto, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<MissionRpDto>(missionRpDto,HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<MissionRpDto> selectMission(@RequestParam("missionId") Long missionId) {
        MissionRpDto missionRpDto = missionService.selectMission(missionId);
        if(missionRpDto == null) {
            return new ResponseEntity<MissionRpDto>(missionRpDto,HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<MissionRpDto>(missionRpDto,HttpStatus.OK);
    }


    @PutMapping("{missionId}")
    public ResponseEntity<MissionRpDto> updateMission(HttpServletRequest request,@PathVariable("missionId") Long missionId,@RequestParam("title") String title, @RequestParam("start") String start, @RequestParam("end") String end, @RequestParam("teacherFile") MultipartFile[] teacherFile, @RequestParam("tag") List<String> tag, @RequestParam("calendarCode") String calendarCode) throws IOException, ParseException {
        String token =request.getHeader(HttpHeaders.AUTHORIZATION);
        Long id = jwtUtil.getIdFromJwt(token.substring("Bearer ".length()));
        MissionRqDto missionRqDto = new MissionRqDto();
        missionRqDto = missionRqDto.builder().id(id).tag(tag).calendarCode(calendarCode).
                start(start).end(end).title(title).build();

        MissionRpDto missionRpDto = missionService.updateMission(missionId,missionRqDto,teacherFile);
        if(missionRpDto == null) {
            return new ResponseEntity<MissionRpDto>(missionRpDto,HttpStatus.NO_CONTENT);
        }
        else if(missionRpDto.getTitle() == null) { // 처리 권한 없을 때
            return new ResponseEntity<MissionRpDto>(missionRpDto,HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(missionRpDto, HttpStatus.CREATED);

    }

    @DeleteMapping("{missionId}")
    public ResponseEntity<Void> deleteMission(HttpServletRequest request,@PathVariable("missionId") Long missionId) {
        String token =request.getHeader(HttpHeaders.AUTHORIZATION);
        Long id = jwtUtil.getIdFromJwt(token.substring("Bearer ".length()));

        try {
            int result = missionService.deleteMission(missionId,id);
            if(result == 1) {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT); //삭제가 됐을 때
            }
            return new ResponseEntity<Void>(HttpStatus.UNAUTHORIZED); // 등록한 사람 아닐 때 (권한 x)
        }
        catch (Exception e) {
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR); //삭제할 미션 없을 때
        }

    }

    @GetMapping("{calendarCode}")
    public ResponseEntity<List<MissionRpDto>> selectMissionList(@PathVariable("calendarCode") String calendarCode) {

        List<MissionRpDto> list = missionService.selectMissionList(calendarCode);

        if(list.size() ==0) {
            return new ResponseEntity<List<MissionRpDto>>(list,HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<List<MissionRpDto>>(list,HttpStatus.OK);


    }



    @GetMapping("/date/{missionDate}")
    public ResponseEntity<List<MissionRpDto>> selectDateMissionList(@PathVariable("missionDate") String missionDate) throws ParseException {

        List<MissionRpDto> list = missionService.selectDateMissionList(missionDate);
        if(list == null) {
            return new ResponseEntity<List<MissionRpDto>>(list,HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<MissionRpDto>>(list,HttpStatus.OK);
    }

}
