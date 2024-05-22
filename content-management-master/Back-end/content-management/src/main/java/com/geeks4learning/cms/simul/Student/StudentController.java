package com.geeks4learning.cms.simul.Student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.geeks4learning.cms.external.Student;

@RestController
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping("/students")
    public ResponseEntity<?> addStudent(@RequestBody Student student) {
        Student newStudent = studentService.addStudent(student);
        return ResponseEntity.ok(newStudent);
    }
}
