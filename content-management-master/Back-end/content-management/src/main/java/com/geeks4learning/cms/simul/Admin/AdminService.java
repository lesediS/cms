package com.geeks4learning.cms.simul.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.geeks4learning.cms.external.Admin;
import com.geeks4learning.cms.external.Student;
import com.geeks4learning.cms.simul.Student.StudentRepo;

@Service
public class AdminService {
   @Autowired
   private AdminRepo adminRepository;

   @Autowired
   private StudentRepo studentRepository;

   public Admin addAdmin(Admin admin) {
      return adminRepository.save(admin);
   }

   public Student addStudent(Student student) {
      return studentRepository.save(student);
   }

}
