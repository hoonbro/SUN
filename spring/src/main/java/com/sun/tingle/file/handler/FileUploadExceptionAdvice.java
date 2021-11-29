package com.sun.tingle.file.handler;

import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.impl.FileSizeLimitExceededException;
import org.apache.tomcat.util.http.fileupload.impl.SizeLimitExceededException;
import org.infinispan.commons.dataconversion.internal.Json;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartException;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class FileUploadExceptionAdvice {
    @Value("${spring.servlet.multipart.max-file-size}")
    private String maxFileSize;

    @Value("${spring.servlet.multipart.max-request-size}")
    private String maxRequestSize;

//    @ExceptionHandler(SizeLimitExceededException.class)
//    @ResponseStatus(value = HttpStatus.PAYLOAD_TOO_LARGE)
//    public ResponseEntity<?> SizeLimitExceededException(SizeLimitExceededException e) {
//        Map<String, String> result = new HashMap<>();
//        result.put("message", "전체 파일 용량이 " + maxRequestSize + "를 초과합니다.");
//        log.info("gd");
//        return new ResponseEntity<>(result,HttpStatus.PAYLOAD_TOO_LARGE);
//    }
//
//    @ExceptionHandler(MultipartException.class)
//    @ResponseStatus(value = HttpStatus.PAYLOAD_TOO_LARGE)
//    public ResponseEntity<?> handleMultipartException(MultipartException e) {
//        Map<String, String> result = new HashMap<>();
//        result.put("message", "파일이 " + maxFileSize + " 혹은 전체 용량이 " + maxRequestSize + "를 초과합니다.");
//        log.info("gd");
//        return new ResponseEntity<>(result,HttpStatus.PAYLOAD_TOO_LARGE);
//    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<?> handleMultipartException(MaxUploadSizeExceededException e) {
        IllegalStateException musee = (IllegalStateException)e.getCause();
        SizeLimitExceededException slee = musee.getCause() instanceof SizeLimitExceededException ? (SizeLimitExceededException) musee.getCause() : null;

        String maxSize = slee == null ? "파일이 " + maxFileSize : "전체 용량이 " + maxRequestSize;
        Map<String, String> result = new HashMap<>();
        result.put("message", maxSize + "를 초과합니다.");
        log.error(result.get("message"));

        return new ResponseEntity<>(result, HttpStatus.PAYLOAD_TOO_LARGE);
    }

//    @ExceptionHandler ( MultipartException.class )
//    public String exception ( MaxUploadSizeExceededException e ) {
//        if  ( e.getCause().getCause() instanceof FileSizeLimitExceededException) { //Exception
//            log.error ( "message exception information =========》" + e .getMessage ( ) ) ;
//            log . error ( "Cause exception information =========》" + e . getCause ( ) . getCause ( ) ) ;
//            String s = "gd";
//            return s ;
//        }else  if  ( e . getCause ( ) . getCause ( )  instanceof  SizeLimitExceededException ) { //The exception thrown by the total file size exceeds the limit
//            log . error ( "message exception information =========" + e . getMessage ( ) ) ;
//            log . error ( "Cause exception information =========》" + e . getCause ( ) . getCause ( ) ) ;
//            String s = "gdgd";
//            return s ;
//        }
//        return  "File upload exception" ;
//    }
}