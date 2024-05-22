package com.geeks4learning.cms.service.impl;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.geeks4learning.cms.external.Admin;
import com.geeks4learning.cms.external.Student;
import com.geeks4learning.cms.model.Course;
import com.geeks4learning.cms.model.Enrollment;
import com.geeks4learning.cms.repository.CourseRepository;
import com.geeks4learning.cms.repository.EnrollmentRepository;
import com.geeks4learning.cms.service.EnrollmentService;
import com.geeks4learning.cms.simul.Admin.AdminRepo;
import com.geeks4learning.cms.simul.Student.StudentRepo;

@Service
public class EnrollmentServiceImpl implements EnrollmentService {

    @Autowired
    StudentRepo studentRepository;

    @Autowired
    AdminRepo adminRepository;

    @Autowired
    CourseRepository courseRepository;

    @Autowired
    EnrollmentRepository enrollmentRepository;

    @Override
    @Transactional
    public String enrollStudent(UUID studentId, UUID courseId, UUID adminId) {

        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDate = currentDate.format(formatter);

        Student student = studentRepository.findById(studentId).orElse(null);
        Course course = courseRepository.findById(courseId).orElse(null);
        Admin admin = adminRepository.findById(adminId).orElse(null);

        if (student == null || course == null || admin == null) {
            return "Invalid student, course, or admin ID";
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setEnrollmentDate(formattedDate);
        enrollment.setAdminId(adminId);
        enrollment.setCourseId(courseId);
        enrollment.setStudentId(studentId);
        enrollmentRepository.save(enrollment);
        return "Student Successfully Enrolled";
    }

    @Override
    public String unEnrollStudent(UUID studentId, UUID courseId, UUID adminId) {

        Student student = studentRepository.findById(studentId).orElse(null);
        Course course = courseRepository.findById(courseId).orElse(null);
        Admin admin = adminRepository.findById(adminId).orElse(null);

        if (student == null || course == null || admin == null) {
            return "Invalid student, course, or admin ID";
        }

        Enrollment enrollment = enrollmentRepository.findByStudentId(studentId);
        enrollmentRepository.delete(enrollment);
        return "Student Successfully Enrolled";
    }
}
