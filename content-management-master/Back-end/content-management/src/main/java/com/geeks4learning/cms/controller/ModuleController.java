package com.geeks4learning.cms.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.geeks4learning.cms.service.ModuleService;
import com.geeks4learning.cms.dto.ModuleDTO;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/content-management/modules")
public class ModuleController {
    @Autowired
    private ModuleService moduleService;

    private final ObjectMapper objectMapper;

    public ModuleController(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @GetMapping
    @Operation(summary = "Retrieve all modules", description = "Get a list of all available modules.")
    public List<ModuleDTO> getAllModules() {
        return moduleService.getAllModules();
    }

    @PostMapping
    @Operation(summary = "Create a new module", description = "Create a new module with the provided JSON data and optionally a profile image. If no image is provided, a default image will be used.")
    public ResponseEntity<String> createModule(
            @RequestParam(value = "image", required = false) MultipartFile file,
            @RequestParam("module") String moduleJson) throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        ModuleDTO moduleDto = objectMapper.readValue(moduleJson, ModuleDTO.class);
        // Create the course with the image file
        moduleService.createModule(moduleDto, file);
        return ResponseEntity.ok("Module created successfully");
    }

    @GetMapping("/{moduleId}")
    @Operation(summary = "Retrieve module by ID", description = "Find and retrieve the module with the specified ID.")
    public ResponseEntity<ModuleDTO> findModuleById(@PathVariable UUID moduleId) {
        Optional<ModuleDTO> module = moduleService.findModuleById(moduleId);

        if (module.isPresent()) {
            return ResponseEntity.ok(module.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{moduleId}")
    @Operation(summary = "Update module by ID", description = "Update the module with the specified ID using the provided JSON data and optionally a profile image.")
    public ResponseEntity<String> updateModule(
            @PathVariable UUID moduleId,
            @RequestParam(value = "file", required = false) MultipartFile imageFile,
            @RequestParam("module") String moduleJson) throws IOException {
        try {
            // Convert JSON string to Course object using ObjectMapper
            ModuleDTO moduleDto = objectMapper.readValue(moduleJson, ModuleDTO.class);

            boolean updated = moduleService.updateModule(moduleDto, moduleId, imageFile);
            if (updated) {
                return ResponseEntity.ok("Course updated successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            e.printStackTrace(); // Log the error for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating course");
        }
    }

    @DeleteMapping("/{moduleId}")
    @Operation(summary = "Delete module by ID", description = "Delete the module with the specified ID.")
    public ResponseEntity<Void> deleteModule(@PathVariable UUID moduleId) {
        boolean deleted = moduleService.deleteModule(moduleId);
        if (deleted) {
            return ResponseEntity.noContent().build(); // Return 204 No Content if module deleted successfully
        } else {
            return ResponseEntity.notFound().build(); // Return 404 Not Found if module not found
        }
    }

}