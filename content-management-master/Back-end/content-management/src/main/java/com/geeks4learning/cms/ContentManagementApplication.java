package com.geeks4learning.cms;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.geeks4learning.cms.external.Admin;
import com.geeks4learning.cms.external.Student;
import com.geeks4learning.cms.external.enums.UserRole;
import com.geeks4learning.cms.simul.Admin.AdminRepo;
import com.geeks4learning.cms.simul.Student.StudentRepo;

@SpringBootApplication
public class ContentManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(ContentManagementApplication.class, args);
    }

    @Bean
    public CommandLineRunner preloadData(StudentRepo studentRepository, AdminRepo adminRepository) {
        return args -> {
            // Preload students
            Student student1 = new Student();
            student1.setFirstname("John");
            student1.setLastname("Doe");
            student1.setEmail("john@gmail.com");
            student1.setPassword("password");
            student1.setCellphone("1234567890");
            student1.setIdNumber("1234567890");
            student1.setBatchId(1L);
            student1.setRole(UserRole.Learner);
            studentRepository.save(student1);

            Student student2 = new Student();
            student2.setFirstname("Jane");
            student2.setLastname("Specter");
            student2.setEmail("jane@gmail.com");
            student2.setPassword("password");
            student2.setCellphone("1234567890");
            student2.setIdNumber("1234567890");
            student2.setBatchId(1L);
            student2.setRole(UserRole.Learner);
            studentRepository.save(student2);

            // Preload admin
            Admin admin = new Admin();
            admin.setFirstname("Neo");
            admin.setLastname("Stiles");
            admin.setEmail("neo@gmail.com");
            admin.setPassword("password");
            admin.setCellphone("1234567890");
            admin.setIdNumber("1234567890");
            admin.setRole(UserRole.Admin);
            adminRepository.save(admin);

        };
    }

}
