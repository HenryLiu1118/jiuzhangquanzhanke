package com.mycompany.myapp.domain.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseDto {

    private long id;

    private String courseName;

    private String courseLocation;

    private String courseContent;

    private long teacherId;
}
