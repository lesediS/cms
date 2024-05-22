package com.geeks4learning.cms.service.impl;

import com.geeks4learning.cms.dto.ModuleDTO;
import com.geeks4learning.cms.dto.UnitDTO;
import com.geeks4learning.cms.dto.converter.Dtoconverter;
import com.geeks4learning.cms.firebase.FirebaseStorageService;
import com.geeks4learning.cms.model.Module;
import com.geeks4learning.cms.repository.ModuleRepository;
import com.geeks4learning.cms.service.ModuleService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ModuleServiceImpl implements ModuleService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    ModuleRepository moduleRepository;

    @Autowired
    private FirebaseStorageService storageService;

    @Autowired
    private Dtoconverter dtoConverter;

    @Override
    @Transactional
    public List<ModuleDTO> getAllModules() {
        List<Module> modules = entityManager.createQuery("SELECT m FROM Module m", Module.class).getResultList();
        return modules.stream().map(module -> dtoConverter.convertModuleToDTO(module)).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void createModule(ModuleDTO moduleDto, MultipartFile imageFile) throws IOException {
        if (imageFile != null && !imageFile.isEmpty()) {
            // Upload the image file to Firebase Storage and get the download URL
            String imageUrl = storageService.uploadFile(imageFile);
            // Set the image URL in the course entity
            moduleDto.setModuleImageURL(imageUrl);
        } else {
            // Handle case where image file is not provided
            // For example, you can set a default image URL or throw an exception
            moduleDto.setModuleImageURL(
                    "https://storage.googleapis.com/content-management-1ee21.appspot.com/1ff4d793-a712-41df-85d9-75f7e71ad8be-istockphoto-1411610324-2048x2048.jpg?GoogleAccessId=firebase-adminsdk-ji0v3@content-management-1ee21.iam.gserviceaccount.com&Expires=1715175667&Signature=uzQ0gUBifiv6ZvvMFDsQ2vrQFbHxNidsnZWMMyyU860C%2B4h0t6lDfDHyIms6zc%2B7uaXmovXDl3uOTRIOSqOzUFqIoSNqPv1kPOlPOJafYjZWmC66PzIUUScIMaC6hgaHAS6Fze831zVtUHQ9t290btyYv5uQUhWn1h2OoGJj5nSE%2BIyXMSiYsYvA%2BULWfg02tkNQPjFB1DlCAWYbB9nbleOR9cn5n157P0kjP%2FICpWLgVzucxOh2I7YS313mI30ZJsYFoM1YlRIpPmtVx4OyCzUyZw9Z8Xiv%2Fh68Ys4BgQJjPX%2FLvZHyzI3cz7C9u%2Bw9Zc3qwMHAKSe6oShWRMV%2BCg%3D%3D");

        }

        Module module = dtoConverter.convertModuleToEntity(moduleDto);
        // courseRepository.save(course);
        entityManager.persist(module);
    }

    @Override
    @Transactional
    public Optional<ModuleDTO> findModuleById(UUID moduleId) {
        Optional<Module> moduleOptional = moduleRepository.findById(moduleId);
        return moduleOptional.map(module -> dtoConverter.convertModuleToDTO(module));
    }

    @Override
    @Transactional
    public boolean updateModule(ModuleDTO moduleDTO, UUID moduleId, MultipartFile imageFile) throws IOException {
        Optional<Module> optionalModule = moduleRepository.findById(moduleId);
        if (optionalModule.isPresent()) {
            Module existingModule = optionalModule.get();

            // Check if the image file is provided
            if (imageFile != null && !imageFile.isEmpty()) {
                // Upload the image file to Firebase Storage and get the download URL
                String imageUrl = storageService.uploadFile(imageFile);
                // Set the image URL in the course entity
                existingModule.setModuleImageURL(imageUrl);
            } else {
                existingModule.setModuleImageURL(
                        "https://storage.googleapis.com/content-management-1ee21.appspot.com/1ff4d793-a712-41df-85d9-75f7e71ad8be-istockphoto-1411610324-2048x2048.jpg?GoogleAccessId=firebase-adminsdk-ji0v3@content-management-1ee21.iam.gserviceaccount.com&Expires=1715175667&Signature=uzQ0gUBifiv6ZvvMFDsQ2vrQFbHxNidsnZWMMyyU860C%2B4h0t6lDfDHyIms6zc%2B7uaXmovXDl3uOTRIOSqOzUFqIoSNqPv1kPOlPOJafYjZWmC66PzIUUScIMaC6hgaHAS6Fze831zVtUHQ9t290btyYv5uQUhWn1h2OoGJj5nSE%2BIyXMSiYsYvA%2BULWfg02tkNQPjFB1DlCAWYbB9nbleOR9cn5n157P0kjP%2FICpWLgVzucxOh2I7YS313mI30ZJsYFoM1YlRIpPmtVx4OyCzUyZw9Z8Xiv%2Fh68Ys4BgQJjPX%2FLvZHyzI3cz7C9u%2Bw9Zc3qwMHAKSe6oShWRMV%2BCg%3D%3D");
            }

            // Update other fields with new values
            existingModule.setName(moduleDTO.getName());
            existingModule.setDescription(moduleDTO.getDescription());
            // Save the updated course entity
            moduleRepository.save(existingModule);
            return true; // Course updated successfully
        } else {
            return false; // Course with the given ID not found
        }
    }

    @Override
    public boolean deleteModule(UUID moduleId) {
        Optional<Module> optionalModule = moduleRepository.findById(moduleId);
        if (optionalModule.isPresent()) {
            moduleRepository.deleteById(moduleId);
            return true; // Module deleted successfully
        } else {
            return false; // Module with the given ID not found
        }
    }

    @Override
    public List<UnitDTO> getAllModuleUnits(UUID moduleId) {
        Optional<Module> moduleOptional = moduleRepository.findById(moduleId);
        if (moduleOptional.isPresent()) {
            Module module = moduleOptional.get();
            return module.getUnits().stream()
                    .map(unit -> dtoConverter.convertUnitToDTO(unit))
                    .collect(Collectors.toList());
        } else {
            return null; // Handle error case where module is not found
        }
    }

}
