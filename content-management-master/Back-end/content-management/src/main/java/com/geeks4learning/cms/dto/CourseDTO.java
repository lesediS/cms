package com.geeks4learning.cms.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import lombok.Data;

@Data
public class CourseDTO {
    private UUID courseId;
    private String name;
    private String description;
    private String courseImageURL;
    private LocalDateTime dateModified = LocalDateTime.now();
    private List<ModuleDTO> modules;
}
