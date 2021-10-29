package com.sun.tingle.member.api.dto.response;

import lombok.*;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDto {
    private HttpStatus httpStatus = null;
    private String message = null;
    private Object data = null;
}
