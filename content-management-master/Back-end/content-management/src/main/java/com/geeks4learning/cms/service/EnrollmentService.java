package com.geeks4learning.cms.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
public interface EnrollmentService {

   public String enrollStudent(UUID studentId, UUID courseId, UUID adminId);

   public String unEnrollStudent(UUID studentId, UUID courseId, UUID adminId);

}
