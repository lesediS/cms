package com.geeks4learning.cms.simul.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.geeks4learning.cms.external.Admin;
import com.geeks4learning.cms.external.Student;

@RestController
@RequestMapping("/admins")
public class AdminController {
    @Autowired
    AdminService adminService;

    @PostMapping("/add/student")
    public ResponseEntity<?> addStudent(@RequestBody Student student) {
        Student newStudent = adminService.addStudent(student);
        return ResponseEntity.ok(newStudent);
    }

    @PostMapping("/add/admin")
    public ResponseEntity<?> addAdmin(@RequestBody Admin admin) {
        Admin newAdmin = adminService.addAdmin(admin);
        return ResponseEntity.ok(newAdmin);
    }
}
