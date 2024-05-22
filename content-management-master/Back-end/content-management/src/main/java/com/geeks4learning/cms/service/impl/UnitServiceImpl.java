package com.geeks4learning.cms.service.impl;

import com.geeks4learning.cms.dto.ModuleDTO;
import com.geeks4learning.cms.dto.UnitDTO;
import com.geeks4learning.cms.dto.converter.Dtoconverter;
import com.geeks4learning.cms.exception.ResourceNotFoundException;
import com.geeks4learning.cms.model.Module;
import com.geeks4learning.cms.model.Unit;
import com.geeks4learning.cms.repository.ModuleRepository;
import com.geeks4learning.cms.repository.UnitRepository;
import com.geeks4learning.cms.service.UnitService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UnitServiceImpl implements UnitService {

    @Autowired
    private UnitRepository unitRepository;

    @Autowired
    private ModuleRepository moduleRepository;

    @Autowired
    private Dtoconverter dtoConverter;

    @Override
    @Transactional
    public String createUnit(UUID moduleId, UnitDTO unitDTO) {
        // Validate moduleId
        Module module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new ResourceNotFoundException("Module not found with id: " + moduleId));
        ModuleDTO moduleDTO = dtoConverter.convertModuleToDTO(module);

        // Set module for the unit
        unitDTO.setModuleDTO(moduleDTO);

        // Set dateModified
        Unit unit = dtoConverter.convertUnitToEntity(unitDTO);
        unitRepository.save(unit);

        // Save the unit
        return "Unit Saved Successfully";
    }

    @Override
    @Transactional
    public Unit updateUnit(UUID unitId, Unit unit) {
        Optional<Unit> optionalUnit = unitRepository.findById(unitId);
        if (optionalUnit.isPresent()) {
            Unit existingUnit = optionalUnit.get();
            existingUnit.setName(unit.getName());
            existingUnit.setDateModified(LocalDateTime.now());
            // Update other fields as needed
            return unitRepository.save(existingUnit);
        } else {
            throw new RuntimeException("Unit not found with id: " + unitId);
        }
    }

    @Override
    @Transactional
    public void deleteUnit(UUID unitId) {
        unitRepository.deleteById(unitId);
    }

    @Override
    public Optional<Unit> findUnitById(UUID unitId) {
        return unitRepository.findById(unitId);
    }

    @Override
    public List<UnitDTO> getAllUnits() {
        List<Unit> units = unitRepository.findAll();
        return units.stream()
                .map(unit -> dtoConverter.convertUnitToDTO(unit))
                .collect(Collectors.toList());
    }

    @Override
    public List<Unit> getUnitsByModuleId(UUID moduleId) {
        // Implement logic to retrieve units by module ID
        return unitRepository.findByModule_moduleId(moduleId);
    }

}
