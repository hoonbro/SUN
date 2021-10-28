package com.sun.tingle.mission.controller;

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
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/mission")
public class MissionController {
    @Autowired
    MissionService missionService;

    @Lazy
    @Autowired
    JwtUtil jwtUtil;


//    @PostMapping
//    public ResponseEntity<MissionRpDto> insertMission(HttpServletRequest request, @RequestBody MissionRqDto missionRqDto) {
//        String token =request.getHeader(HttpHeaders.AUTHORIZATION);
//        Long id = jwtUtil.getIdFromJwt(token.substring("Bearer ".length()));
//        missionRqDto.setId(id);
//        System.out.println("하하하하하");
//        System.out.println(name);
//        MissionRpDto missionRpDto = missionService.insertMission(missionRqDto);
//        if(missionRpDto == null) {
//            return new ResponseEntity<MissionRpDto>(missionRpDto, HttpStatus.CONFLICT);
//        }
//        return new ResponseEntity<MissionRpDto>(missionRpDto,HttpStatus.CREATED);
//    }
    @PostMapping
    public ResponseEntity<MissionRpDto> insertMission(HttpServletRequest request, @RequestParam("title") String title, @RequestParam("start") String start, @RequestParam("end") String end, @RequestParam("teacherFile") MultipartFile[] teacherFile, @RequestParam("tag") List<String> tag, @RequestParam("calendarCode") String calendarCode) throws IOException {
//      public ResponseEntity<MissionRpDto> insertMission(HttpServletRequest request, @RequestParam("missionId") Long missionId) {

        String token =request.getHeader(HttpHeaders.AUTHORIZATION);
        Long id = jwtUtil.getIdFromJwt(token.substring("Bearer ".length()));
//        System.out.println(missionId);
        System.out.println(title);
        System.out.println(start);
        System.out.println(end);

//        for(int i=0; i<tag.size(); i++) {
//            System.out.print(tag.get(i)+" ");
//        }
//        System.out.println();
//        System.out.println(calendarCode);
//        System.out.println(teacherFile[0].getOriginalFilename().toString());
//        System.out.println(teacherFile[1].getOriginalFilename().toString());




        MissionRpDto h = new MissionRpDto();
        return new ResponseEntity<MissionRpDto>(h,HttpStatus.CREATED);

//        MissionRpDto missionRpDto = missionService.insertMission(missionRqDto);
//        if(missionRpDto == null) {
//            return new ResponseEntity<MissionRpDto>(missionRpDto, HttpStatus.CONFLICT);
//        }
//        return new ResponseEntity<MissionRpDto>(missionRpDto,HttpStatus.CREATED);
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
    public ResponseEntity<MissionRpDto> updateMission(@PathVariable("missionId") Long missionId,@RequestBody MissionRqDto missionRqDto) {
        MissionRpDto missionRpDto = missionService.updateMission(missionId,missionRqDto);
        if(missionRpDto == null) {
            return new ResponseEntity<MissionRpDto>(missionRpDto,HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<MissionRpDto>(missionRpDto,HttpStatus.CREATED);

    }

    @DeleteMapping("{missionId}")
    public ResponseEntity<Void> deleteMission(@PathVariable("missionId") Long missionId) {

        try {
            missionService.deleteMission(missionId);
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT); //삭제가 됐을 때
        }
        catch (Exception e) {
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR); //삭제할 캘린더가 없을 때
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

}
