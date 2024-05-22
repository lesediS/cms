package com.geeks4learning.cms.simul.Student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.geeks4learning.cms.external.Student;

@Service
public class StudentService {
    @Autowired
    private StudentRepo studentRepository;

    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

}
