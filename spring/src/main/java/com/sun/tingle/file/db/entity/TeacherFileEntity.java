package com.sun.tingle.file.db.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TeacherFileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_id")
    public Long fileId;

    @Column(name = "file_uuid")
    public String fileUuid;

    @Column(name="file_name")
    public String fileName;

    @Column(name = "mission_id")
    public Long missionId;

    @Column(name = "id")
    public Long id;



}
