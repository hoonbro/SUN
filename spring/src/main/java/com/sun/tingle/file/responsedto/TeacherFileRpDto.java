package com.sun.tingle.file.responsedto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TeacherFileRpDto {
    Long fileId;
    String fileUuid;
    String fileName;
}
