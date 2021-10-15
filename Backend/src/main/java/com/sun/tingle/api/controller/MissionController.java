package com.sun.tingle.api.controller;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.sun.tingle.api.requestdto.MissionRequestDto;
import com.sun.tingle.api.responsedto.MissionResponseDto;
import com.sun.tingle.api.service.S3Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.ws.Response;
import java.io.IOException;

@RestController
@RequestMapping("/mission")
public class MissionController {
    private S3Service s3Service;

    @GetMapping("/test")
    public ResponseEntity<String> test(){
        System.out.println("하이하이하이");
        return new ResponseEntity<String>("하이", HttpStatus.OK);
    }



    @PostMapping(value = "/register")
    public ResponseEntity<String> test2(@RequestParam("qqq") MissionRequestDto missionRequestDto) throws IOException {
        System.out.println(missionRequestDto.getTeacherId());
        System.out.println(missionRequestDto.getTitle());
//        System.out.println(missionRequestDto.getMissionInfo().getMemo());
//        System.out.println(missionRequestDto.getMissionInfo().getTitle());
//        System.out.println(missionRequestDto.getMissionFile().getName());
//        System.out.println(teacherId);


        return new ResponseEntity<String>("하하",HttpStatus.OK);



    }






}
