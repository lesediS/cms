package com.geeks4learning.cms.repository;

import com.geeks4learning.cms.model.Course;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, UUID> {

}
