package com.geeks4learning.cms.service.impl;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import com.geeks4learning.cms.firebase.FirebaseStorageService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.geeks4learning.cms.dto.CourseDTO;
import com.geeks4learning.cms.dto.ModuleDTO;
import com.geeks4learning.cms.dto.converter.Dtoconverter;
import com.geeks4learning.cms.model.Course;
import com.geeks4learning.cms.model.Module;
import com.geeks4learning.cms.repository.CourseRepository;
import com.geeks4learning.cms.service.CourseService;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CourseServiceImpl implements CourseService {

   @Autowired
   private CourseRepository courseRepository;

   @PersistenceContext
   private EntityManager entityManager;

   @Autowired
   private FirebaseStorageService storageService;

   @Autowired
   private Dtoconverter dtoConverter;

   @Override
   @Transactional
   public List<CourseDTO> getAllCourses() {
      List<Course> courses = entityManager.createQuery("SELECT c FROM Course c", Course.class).getResultList();
      return courses.stream()
            .map(course -> dtoConverter.convertToCourseDTO(course))
            .collect(Collectors.toList());
   }

   @Override
   public List<ModuleDTO> getAllCourseModules(UUID courseId) {
      Optional<Course> courseOptional = courseRepository.findById(courseId);
      if (courseOptional.isPresent()) {
         Course course = courseOptional.get();
         List<Module> modules = course.getModules(); // Get modules associated with the course
         // Convert modules to ModuleDTOs
         return modules.stream()
               .map(module -> dtoConverter.convertModuleToDTO(module))
               .collect(Collectors.toList());
         // return moduleDTOs;
      } else {
         return Collections.emptyList(); // Course not found, return an empty list
      }
   }

   @Override
   @Transactional
   public void createCourse(CourseDTO coursedDto, MultipartFile imageFile) throws IOException {
      // Check if the image file is provided
      if (imageFile != null && !imageFile.isEmpty()) {
         // Upload the image file to Firebase Storage and get the download URL
         String imageUrl = storageService.uploadFile(imageFile);
         // Set the image URL in the course entity+
         coursedDto.setCourseImageURL(imageUrl);
      } else {

         coursedDto.setCourseImageURL(
               "https://storage.googleapis.com/content-management-1ee21.appspot.com/1ff4d793-a712-41df-85d9-75f7e71ad8be-istockphoto-1411610324-2048x2048.jpg?GoogleAccessId=firebase-adminsdk-ji0v3@content-management-1ee21.iam.gserviceaccount.com&Expires=1715175667&Signature=uzQ0gUBifiv6ZvvMFDsQ2vrQFbHxNidsnZWMMyyU860C%2B4h0t6lDfDHyIms6zc%2B7uaXmovXDl3uOTRIOSqOzUFqIoSNqPv1kPOlPOJafYjZWmC66PzIUUScIMaC6hgaHAS6Fze831zVtUHQ9t290btyYv5uQUhWn1h2OoGJj5nSE%2BIyXMSiYsYvA%2BULWfg02tkNQPjFB1DlCAWYbB9nbleOR9cn5n157P0kjP%2FICpWLgVzucxOh2I7YS313mI30ZJsYFoM1YlRIpPmtVx4OyCzUyZw9Z8Xiv%2Fh68Ys4BgQJjPX%2FLvZHyzI3cz7C9u%2Bw9Zc3qwMHAKSe6oShWRMV%2BCg%3D%3D");

      }

      Course course = dtoConverter.convertToCourseEntity(coursedDto);
      // courseRepository.save(course);
      entityManager.persist(course);
   }

   @Override
   @Transactional
   public Optional<CourseDTO> findCourseById(UUID courseId) {
      Optional<Course> courseOptional = courseRepository.findById(courseId);
      return courseOptional.map(course -> dtoConverter.convertToCourseDTO(course));
   }

   @Override
   @Transactional
   public List<ModuleDTO> addModuleToCourse(UUID courseId, UUID moduleId) {
      Course course = entityManager.find(Course.class, courseId);
      Module module = entityManager.find(Module.class, moduleId);
      if (course != null && module != null) {
         course.getModules().add(module);
         module.getCourses().add(course);
         entityManager.persist(course); // Persist the changes to the course
         return getAllCourseModules(courseId);
      } else {
         return null; // Handle error case where either course or module is not found
      }
   }

   @Override
   public boolean deleteCourse(UUID courseId) {
      Optional<Course> course = courseRepository.findById(courseId);

      if (course.isPresent()) {
         courseRepository.deleteById(courseId);
         return true;
      } else {
         return false;
      }

   }

   @Override
   @Transactional
   public boolean updateCourse(CourseDTO coursedDto, UUID courseId, MultipartFile imageFile) throws IOException {
      Optional<Course> optionalCourse = courseRepository.findById(courseId);
      if (optionalCourse.isPresent()) {
         Course existingCourse = optionalCourse.get();

         // Check if the image file is provided
         if (imageFile != null && !imageFile.isEmpty()) {
            // Upload the image file to Firebase Storage and get the download URL
            String imageUrl = storageService.uploadFile(imageFile);
            // Set the image URL in the course entity
            existingCourse.setCourseImageURL(imageUrl);
         } else {
            existingCourse.setCourseImageURL(
                  "https://storage.googleapis.com/content-management-1ee21.appspot.com/1ff4d793-a712-41df-85d9-75f7e71ad8be-istockphoto-1411610324-2048x2048.jpg?GoogleAccessId=firebase-adminsdk-ji0v3@content-management-1ee21.iam.gserviceaccount.com&Expires=1715175667&Signature=uzQ0gUBifiv6ZvvMFDsQ2vrQFbHxNidsnZWMMyyU860C%2B4h0t6lDfDHyIms6zc%2B7uaXmovXDl3uOTRIOSqOzUFqIoSNqPv1kPOlPOJafYjZWmC66PzIUUScIMaC6hgaHAS6Fze831zVtUHQ9t290btyYv5uQUhWn1h2OoGJj5nSE%2BIyXMSiYsYvA%2BULWfg02tkNQPjFB1DlCAWYbB9nbleOR9cn5n157P0kjP%2FICpWLgVzucxOh2I7YS313mI30ZJsYFoM1YlRIpPmtVx4OyCzUyZw9Z8Xiv%2Fh68Ys4BgQJjPX%2FLvZHyzI3cz7C9u%2Bw9Zc3qwMHAKSe6oShWRMV%2BCg%3D%3D");
         }

         // Update other fields with new values
         existingCourse.setName(coursedDto.getName());
         existingCourse.setDescription(coursedDto.getDescription());
         // Save the updated course entity
         courseRepository.save(existingCourse);
         return true; // Course updated successfully
      } else {
         return false; // Course with the given ID not found
      }
   }

   public List<Module> getCourseModules(UUID courseId) {
      Course course = courseRepository.findById(courseId)
            .orElseThrow(() -> new RuntimeException("Course not found"));

      return course.getModules();
   }

}
