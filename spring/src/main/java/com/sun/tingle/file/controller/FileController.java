package com.sun.tingle.file.controller;


import com.sun.tingle.file.responsedto.MissionFileRpDto;
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
public class FileController {

    @Autowired
    private S3service s3service;

    @Lazy
    @Autowired
    JwtUtil jwtUtil;



//    @PostMapping
//    public ResponseEntity<String> fileUpload(@RequestParam("missionFile") MultipartFile file) throws IOException {
//        String url = s3service.ProfileUpload(file);
//
//        return new ResponseEntity<String>(url,HttpStatus.OK);
//    }



    @PostMapping("/child")
    public ResponseEntity<MissionFileRpDto> missionFileUpload(HttpServletRequest request,@RequestParam("missionFile") MultipartFile file, @RequestParam("missionId") Long missionId ) throws IOException {
        String token =request.getHeader(HttpHeaders.AUTHORIZATION);
        Long id = jwtUtil.getIdFromJwt(token.substring("Bearer ".length()));
        MissionFileRpDto r = s3service.missionFileUpload(file,missionId,id);

        return new ResponseEntity<MissionFileRpDto>(r,HttpStatus.OK);
    }




//    @PostMapping("/list")
//    public ResponseEntity<List<MissionFileRpDto>> fileUploads(HttpServletRequest request, @RequestParam("missionFile") MultipartFile[] file, @RequestParam("missionId") String missionIds) throws IOException {
//        String token =request.getHeader(HttpHeaders.AUTHORIZATION);
//        Long id = jwtUtil.getIdFromJwt(token.substring("Bearer ".length()));
//        Long missionId=Long.parseLong(missionIds);
//        if(file == null) {
//            System.out.println("여긴안돼");
//        }
//
//        List<MissionFileRpDto> list = s3service.uploads(file,missionId,id);
//        return new ResponseEntity<List<MissionFileRpDto>>(list,HttpStatus.OK);
//
//    }

    @GetMapping("/list")
    public ResponseEntity<List<MissionFileRpDto>> selectFileList(@RequestParam("missionId") Long missionId) {
        List<MissionFileRpDto> list = new ArrayList<>();

        list = s3service.selectFileList(missionId);

        if(list.size() ==0) {
            return new ResponseEntity<List<MissionFileRpDto>>(list,HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<List<MissionFileRpDto>>(list,HttpStatus.OK);


    }


//    @GetMapping("{uuid}")
//    public ResponseEntity<InputStream> selectFile(@PathVariable("uuid") String uuid) {
//
////        Resouce r = null;
//        InputStream inputStream = null;
//        try {
//            inputStream  = s3service.download(uuid);
//
//            System.out.println("여긴지1");
//        }
//        catch(Exception e) {
//            System.out.println(e.getMessage());
//            System.out.println("여긴지2");
//            return new ResponseEntity<InputStream>(inputStream,HttpStatus.OK);
//
//        }
//
//        return new ResponseEntity<InputStream>(inputStream,HttpStatus.OK);
//    }


    @DeleteMapping
    public ResponseEntity<Void> deleteMissionFile(@RequestParam("uuid") String uuid) {
        long id = 8;
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



//    @DeleteMapping("{fileId}/{uuid}")
//    public ResponseEntity<Void> deleteMissionFile(@PathVariable("fileId") Long fileId ,@PathVariable("fileName") String fileName) {
//
//        try {
//            s3service.deleteMissionFile(fileId,fileName);
//            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
//        }
//        catch(Exception e) {
//            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//
//
//
//    }

}
