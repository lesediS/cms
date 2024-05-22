package com.geeks4learning.cms.simul.Student;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.geeks4learning.cms.external.Student;

public interface StudentRepo extends JpaRepository<Student, UUID> {

}
