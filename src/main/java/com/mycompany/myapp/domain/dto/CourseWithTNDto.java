package com.mycompany.myapp.domain.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseWithTNDto {

    private long id;

    private String courseName;

    private String courseLocation;

    private String courseContent;

    private long teacherId;

    private String teacherName;
}
