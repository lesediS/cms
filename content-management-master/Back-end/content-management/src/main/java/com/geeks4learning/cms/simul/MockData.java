package com.geeks4learning.cms.simul;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.geeks4learning.cms.external.Admin;
import com.geeks4learning.cms.external.Student;
import com.geeks4learning.cms.external.enums.UserRole;

public class MockData {

    public static List<Admin> getAdmins() {
        List<Admin> admins = new ArrayList<>();

        Admin admin1 = new Admin();
        admin1.setFirstname("John");
        admin1.setLastname("Doe");
        admin1.setIdNumber("123456789");
        admin1.setEmail("john.doe@example.com");
        admin1.setCellphone("1234567890");
        admin1.setCreationDate(LocalDate.now());
        admin1.setRole(UserRole.Admin);
        admin1.setPassword("admin123");
        admins.add(admin1);

        Admin admin2 = new Admin();
        admin2.setFirstname("Alice");
        admin2.setLastname("Smith");
        admin2.setIdNumber("987654321");
        admin2.setEmail("alice.smith@example.com");
        admin2.setCellphone("9876543210");
        admin2.setCreationDate(LocalDate.now());
        admin2.setRole(UserRole.Admin);
        admin2.setPassword("admin456");
        admins.add(admin2);

        return admins;
    }

    public static List<Student> getStudents() {
        List<Student> Students = new ArrayList<>();

        Student Student1 = new Student();
        Student1.setLastname("Doe");
        Student1.setEmail("john.doe@example.com");
        Student1.setFirstname("John");
        Student1.setRole(UserRole.Learner);
        Student1.setIdNumber("123456789");
        Student1.setPassword("password123");
        Student1.setBatchId(1L);
        Students.add(Student1);

        Student Student2 = new Student();
        Student2.setLastname("Smith");
        Student2.setEmail("alice.smith@example.com");
        Student2.setFirstname("Alice");
        Student2.setRole(UserRole.Learner);
        Student2.setIdNumber("987654321");
        Student2.setPassword("password456");
        Student2.setBatchId(2L);
        Students.add(Student2);

        return Students;
    }

    
}