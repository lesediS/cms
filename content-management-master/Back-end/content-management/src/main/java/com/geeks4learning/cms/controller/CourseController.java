package com.geeks4learning.cms.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.geeks4learning.cms.dto.ModuleDTO;
import com.geeks4learning.cms.firebase.FirebaseStorageService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.geeks4learning.cms.dto.CourseDTO;
import com.geeks4learning.cms.service.CourseService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/content-management/courses")

public class CourseController {

    @Autowired
    private CourseService courseService;

    private final ObjectMapper objectMapper;

    public CourseController(CourseService courseService, FirebaseStorageService storageService,
            ObjectMapper objectMapper) {
        this.courseService = courseService;
        this.objectMapper = objectMapper;
    }

    @GetMapping("/{courseId}/modules")
    @Operation(summary = "Get all modules for a course", description = "Retrieve all modules belonging to the specified course.")
    ResponseEntity<List<ModuleDTO>> getAllCourseModules(@PathVariable UUID courseId) {
        List<ModuleDTO> modules = courseService.getAllCourseModules(courseId);

        if (modules.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(modules, HttpStatus.OK);
        }
    }

    @GetMapping
    @Operation(summary = "Retrieve all courses", description = "Get a list of all available courses")
    ResponseEntity<List<CourseDTO>> getAllCourses() {
        return new ResponseEntity<>(courseService.getAllCourses(), HttpStatus.OK);
    }

    @PostMapping
    @Operation(summary = "Create a new course", description = "Create a new course with the provided JSON data and optionally a profile image. If no image is provided, a default image will be used.")
    public ResponseEntity<String> createCourse(
            @RequestParam(name = "image", required = false) MultipartFile file,
            @RequestParam("course") String courseJson) throws IOException {

        // Parse the course JSON string into a Course object
        ObjectMapper objectMapper = new ObjectMapper();
        CourseDTO coursedDto = objectMapper.readValue(courseJson, CourseDTO.class);
        // Create the course with the image file
        courseService.createCourse(coursedDto, file);
        return ResponseEntity.ok("Course created successfully");
    }

    @PostMapping("/{courseId}/modules/{moduleId}")
    @Operation(summary = "Add a module to a course", description = "Add the specified module to the course identified by courseId.")
    public List<ModuleDTO> addModuleToCourse(@PathVariable UUID courseId, @PathVariable UUID moduleId) {
        return courseService.addModuleToCourse(courseId, moduleId);
    }

    @GetMapping("/{courseId}")
    @Operation(summary = "Retrieve course by ID", description = "Find and retrieve the course with the specified ID.")
    ResponseEntity<Optional<CourseDTO>> findCourseById(@PathVariable UUID courseId) {

        Optional<CourseDTO> course = courseService.findCourseById(courseId);

        if (course.isPresent()) {

            return new ResponseEntity<>(course, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

    }

    @DeleteMapping("/{courseId}")
    @Operation(summary = "Delete course by ID", description = "Delete the course with the specified ID.")
    ResponseEntity<String> deleteCourse(@PathVariable UUID courseId) {
        boolean isDeleted = courseService.deleteCourse(courseId);

        if (isDeleted) {
            return new ResponseEntity<>("course deleted successfully", HttpStatus.OK);

        } else {

            return new ResponseEntity<>("course not found", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("{courseId}")
    @Operation(summary = "Update course by ID", description = "Update the course with the specified ID using the provided JSON data and optionally a profile image.")
    public ResponseEntity<String> updateCourse(
            @PathVariable UUID courseId,
            @RequestParam(value = "file", required = false) MultipartFile imageFile,
            @RequestParam("course") String courseJson) throws IOException {
        try {
            // Convert JSON string to Course object using ObjectMapper
            CourseDTO coursedDto = objectMapper.readValue(courseJson, CourseDTO.class);

            boolean updated = courseService.updateCourse(coursedDto, courseId, imageFile);
            if (updated) {
                return ResponseEntity.ok("Course updated successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            e.printStackTrace(); // Log the error for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating course");
        }
    }

}