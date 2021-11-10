package com.sun.tingle.file.responsedto;


import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MissionFileRpDto {
//    Long fileId;
    String fileUuid;
    String fileName;
    String type;
//    Long missionId;
}
