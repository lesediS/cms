package com.geeks4learning.cms.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.geeks4learning.cms.dto.ModuleDTO;
import com.geeks4learning.cms.dto.UnitDTO;

import org.springframework.web.multipart.MultipartFile;

@Service
public interface ModuleService {

    List<ModuleDTO> getAllModules();

    List<UnitDTO> getAllModuleUnits(UUID moduleId);

    void createModule(ModuleDTO moduleDto, MultipartFile imageFile) throws IOException;

    Optional<ModuleDTO> findModuleById(UUID ModuleId);

    boolean updateModule(ModuleDTO moduledDto, UUID moduleId, MultipartFile imageFile) throws IOException;

    boolean deleteModule(UUID ModuleId);

}
