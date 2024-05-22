package com.geeks4learning.cms.dto.converter;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.geeks4learning.cms.dto.ContentDTO;
import com.geeks4learning.cms.dto.CourseDTO;
import com.geeks4learning.cms.dto.ModuleDTO;
import com.geeks4learning.cms.dto.UnitDTO;
import com.geeks4learning.cms.model.Content;
import com.geeks4learning.cms.model.Course;
import com.geeks4learning.cms.model.Module;
import com.geeks4learning.cms.model.Unit;

@Component
public class Dtoconverter {

   // ?To DTO conversion methods

   public CourseDTO convertToCourseDTO(Course course) {
      CourseDTO courseDTO = new CourseDTO();
      courseDTO.setCourseId(course.getCourseId());
      courseDTO.setName(course.getName());
      courseDTO.setDescription(course.getDescription());
      courseDTO.setCourseImageURL(course.getCourseImageURL());
      courseDTO.setModules(course.getModules().stream()
            .map(module -> convertModuleToDTO(module)) // Assuming you have a ModuleMapper class
            .collect(Collectors.toList()));
      return courseDTO;
   }

   public ModuleDTO convertModuleToDTO(Module module) {
      ModuleDTO moduleDTO = new ModuleDTO();
      moduleDTO.setModuleId(module.getModuleId());
      moduleDTO.setName(module.getName());
      moduleDTO.setDescription(module.getDescription());
      moduleDTO.setModuleImageURL(module.getModuleImageURL());
      moduleDTO.setUnits(module.getUnits().stream()
            .map(unit -> convertUnitToDTO(unit)) // Assuming you have a UnitMapper class
            .collect(Collectors.toList()));
      return moduleDTO;
   }

   public UnitDTO convertUnitToDTO(Unit unit) {
      UnitDTO unitDTO = new UnitDTO();
      unitDTO.setUnitId(unit.getUnitId());
      unitDTO.setUnitName(unit.getName());
      unitDTO.setModuleId(unit.getModule().getModuleId());
      unitDTO.setDateModified(unit.getDateModified());
      unitDTO.setContent(
            unit.getContent().stream().map(content -> convertContentToDTO(content)).collect(Collectors.toList()));
      return unitDTO;
   }

   public ContentDTO convertContentToDTO(Content content) {
      ContentDTO contentDTO = new ContentDTO();
      contentDTO.setCaption(content.getCaption());
      contentDTO.setContentId(content.getContentId());
      contentDTO.setContentValue(content.getContentValue());
      contentDTO.setType(content.getType());
      // contentDTO.setUnit(content.getUnit());
      return contentDTO;
   }

   // ?To Entity conversion methods

   public Course convertToCourseEntity(CourseDTO courseDTO) {
      Course course = new Course();
      course.setCourseId(courseDTO.getCourseId());
      course.setName(courseDTO.getName());
      course.setDescription(courseDTO.getDescription());
      course.setCourseImageURL(courseDTO.getCourseImageURL());

      if (courseDTO.getModules() != null) {
         List<Module> modules = courseDTO.getModules().stream()
               .map(this::convertModuleToEntity)
               .collect(Collectors.toList());
         if (modules != null) {
            course.setModules(modules);
         }
      }
      // Convert modules

      return course;
   }

   public Module convertModuleToEntity(ModuleDTO moduleDTO) {
      Module module = new Module();
      module.setModuleId(moduleDTO.getModuleId());
      module.setName(moduleDTO.getName());
      module.setDescription(moduleDTO.getDescription());
      module.setModuleImageURL(moduleDTO.getModuleImageURL());
      if (moduleDTO.getUnits() != null) {
         List<Unit> units = moduleDTO.getUnits().stream()
               .map(this::convertUnitToEntity)
               .collect(Collectors.toList());
         module.setUnits(units);
      }
      return module;
   }

   public Unit convertUnitToEntity(UnitDTO unitDTO) {
      Unit unit = new Unit();
      unit.setUnitId(unitDTO.getUnitId());
      unit.setName(unitDTO.getUnitName());
      unit.setDateModified(unitDTO.getDateModified());
      unit.setModule(convertModuleToEntity(unitDTO.getModuleDTO()));
      unit.setContent(null);
      if (unitDTO.getContent() != null) {
         List<Content> contents = unitDTO.getContent().stream().map(this::convertContentToEntity)
               .collect(Collectors.toList());
         unit.setContent(contents);
      }
      return unit;
   }

   public Content convertContentToEntity(ContentDTO contentDTO) {
      Content content = new Content();
      content.setCaption(contentDTO.getCaption());
      content.setContentId(contentDTO.getContentId());
      content.setContentValue(contentDTO.getContentValue());
      content.setType(contentDTO.getType());
      content.setUnit(convertUnitToEntity(contentDTO.getUnit()));
      return content;
   }

}
