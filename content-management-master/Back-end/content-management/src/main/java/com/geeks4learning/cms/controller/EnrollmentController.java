package com.geeks4learning.cms.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.geeks4learning.cms.repository.CourseRepository;
import com.geeks4learning.cms.service.EnrollmentService;
import com.geeks4learning.cms.simul.Admin.AdminRepo;
import com.geeks4learning.cms.simul.Student.StudentRepo;

@RestController
@RequestMapping("/content-management/enrollment")
public class EnrollmentController {

    @Autowired
    EnrollmentService enrollmentService;

    @Autowired
    StudentRepo studentRepository;

    @Autowired
    AdminRepo adminRepository;

    @Autowired
    CourseRepository courseRepository;

    @PostMapping("/enroll")
    public ResponseEntity<String> enrollStudent(@RequestParam UUID studentId,
            @RequestParam UUID courseId,
            @RequestParam UUID adminId) {

        enrollmentService.enrollStudent(studentId, courseId, adminId);
        return ResponseEntity.ok("Student enrolled successfully.");
    }

    @DeleteMapping("/unroll")
    public ResponseEntity<String> unEnrollStudent(@RequestParam UUID studentId,
            @RequestParam UUID courseId,
            @RequestParam UUID adminId) {

        enrollmentService.unEnrollStudent(studentId, courseId, adminId);
        return ResponseEntity.ok("Student unrolled successfully.");
    }
}
