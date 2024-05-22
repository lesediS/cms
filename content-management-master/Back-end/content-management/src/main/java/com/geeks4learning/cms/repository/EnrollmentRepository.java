package com.geeks4learning.cms.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.geeks4learning.cms.model.Enrollment;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, UUID> {
   Enrollment findByStudentId(UUID studentId);
}
