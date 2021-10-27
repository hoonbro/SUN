package com.sun.tingle.file.controller;


import com.amazonaws.services.s3.model.JSONInput;
import com.amazonaws.services.s3.model.S3Object;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.sun.tingle.file.responsedto.MissionFileRpDto;
import com.sun.tingle.file.service.S3service;
import com.sun.tingle.member.util.JwtUtil;
import jdk.swing.interop.SwingInterOpUtils;
import org.apache.http.impl.bootstrap.HttpServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.awt.image.ImagingOpException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/file")
public class FileController {

    @Autowired
    private S3service s3service;

    @Lazy
    @Autowired
    JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<Void> test() {
        System.out.println("하이");
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<List<MissionFileRpDto>> fileUpload(HttpServletRequest request, @RequestParam("missionFile") MultipartFile[] file, @RequestParam("missionId") String missionIds) throws IOException {
        String token =request.getHeader(HttpHeaders.AUTHORIZATION);
        Long id = jwtUtil.getIdFromJwt(token.substring("Bearer ".length()));
        Long missionId=Long.parseLong(missionIds);
        if(file == null) {
            System.out.println("여긴안돼");
        }

        List<MissionFileRpDto> list = s3service.upload(file,missionId,id);
        return new ResponseEntity<List<MissionFileRpDto>>(list,HttpStatus.OK);

    }

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





    @DeleteMapping("{fileId}/{uuid}")
    public ResponseEntity<Void> deleteFile(@PathVariable("fileId") Long fileId ,@PathVariable("uuid") String uuid) {

        try {
            s3service.deleteFile(fileId,uuid);
            return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
        }
        catch(Exception e) {
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }



    }

}
