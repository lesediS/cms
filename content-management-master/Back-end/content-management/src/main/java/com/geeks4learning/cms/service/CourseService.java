package com.geeks4learning.cms.service;

import com.geeks4learning.cms.dto.CourseDTO;
import com.geeks4learning.cms.dto.ModuleDTO;

import com.geeks4learning.cms.model.Module;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public interface CourseService {
    List<ModuleDTO> getAllCourseModules(UUID courseId);

    List<CourseDTO> getAllCourses();

    void createCourse(CourseDTO coursedDto, MultipartFile imageFile) throws IOException;

    Optional<CourseDTO> findCourseById(UUID courseId);

    List<ModuleDTO> addModuleToCourse(UUID courseId, UUID moduleId);

    boolean deleteCourse(UUID courseId);

    boolean updateCourse(CourseDTO coursedDto, UUID courseId, MultipartFile imageFile) throws IOException;

    List<Module> getCourseModules(UUID courseId);

}
