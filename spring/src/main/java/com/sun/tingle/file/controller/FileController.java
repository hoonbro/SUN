package com.sun.tingle.file.controller;


import com.sun.tingle.file.responsedto.MissionFileRpDto;
import com.sun.tingle.file.responsedto.TeacherFileRpDto;
import com.sun.tingle.file.service.S3service;
import com.sun.tingle.member.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/file")
@CrossOrigin("*")
public class FileController {

    @Autowired
    private S3service s3service;

    @Lazy
    @Autowired
    JwtUtil jwtUtil;

    @PostMapping("/child")
    public ResponseEntity<MissionFileRpDto> missionFileUpload(HttpServletRequest request,@RequestParam("missionFile") MultipartFile file, @RequestParam("missionId") Long missionId ) throws IOException {
        String token =request.getHeader(HttpHeaders.AUTHORIZATION);
        Long id = jwtUtil.getIdFromJwt(token.substring("Bearer ".length()));
        MissionFileRpDto r = null;
        try {
             r = s3service.missionFileUpload(file,missionId,id);
            return new ResponseEntity<MissionFileRpDto>(r,HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<MissionFileRpDto>(r,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/teacher")
    public ResponseEntity<TeacherFileRpDto> teacherFileUpload(HttpServletRequest request, @RequestParam("teacherFile") MultipartFile file) throws IOException {
        String token =request.getHeader(HttpHeaders.AUTHORIZATION);
        Long id = jwtUtil.getIdFromJwt(token.substring("Bearer ".length()));
        TeacherFileRpDto teacherFileRpDto = s3service.teacherFileUpload(file,id);
        return new ResponseEntity<TeacherFileRpDto>(teacherFileRpDto,HttpStatus.CREATED);
    }





    @PostMapping("/test")
    public ResponseEntity<String> test(@RequestParam("missionFile") MultipartFile file,@RequestParam("missionId") Long missionId) throws IOException {
        String calendarCode = "gkgk";
        String url = s3service.s3folderIncludingUpload(file,calendarCode,missionId);
        return new ResponseEntity<String>(url,HttpStatus.OK);
    }



//    @GetMapping("/list") // 미션 조회 시 어짜피 같이 반환 되서 안쓸 거 같음 혹시 몰라 나둠
//    public ResponseEntity<List<MissionFileRpDto>> selectFileList(@RequestParam("missionId") Long missionId) {
//        List<MissionFileRpDto> list = new ArrayList<>();
//
//        list = s3service.selectFileList(missionId);
//
//        if(list.size() ==0) {
//            return new ResponseEntity<List<MissionFileRpDto>>(list,HttpStatus.NO_CONTENT);
//        }
//
//        return new ResponseEntity<List<MissionFileRpDto>>(list,HttpStatus.OK);
//
//
//    }



    @DeleteMapping("/child")
    public ResponseEntity<Void> deleteMissionFile(HttpServletRequest request, @RequestParam("uuid") String uuid) {
        String token =request.getHeader(HttpHeaders.AUTHORIZATION);
        Long id = jwtUtil.getIdFromJwt(token.substring("Bearer ".length()));
        try {
//            s3service.deleteFile(uuid);
            int result = s3service.deleteMissionFile(uuid,id);
            if(result == 0) { // 삭제할 사진이 없을 때
                return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            else if(result ==1) { //
                return new ResponseEntity<Void>(HttpStatus.UNAUTHORIZED);
            }
            else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }

        }
        catch (Exception e) {
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/teacher")
    public ResponseEntity<Void> deleteTeacherFile(HttpServletRequest request,@RequestParam("uuid") String uuid) {
        String token =request.getHeader(HttpHeaders.AUTHORIZATION);
        Long id = jwtUtil.getIdFromJwt(token.substring("Bearer ".length()));
        try {
//            s3service.deleteFile(uuid);
            int result = s3service.deleteTeacherFile(uuid,id);
            if(result==0) { // 삭제할 사진이  없을 때
                return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
            else if(result ==1) { // 본인이 아니라서 권한 없을 때
                return new ResponseEntity<Void>(HttpStatus.UNAUTHORIZED);
            }
            else { // 삭제 완료
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }

        }
        catch (Exception e) {
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
