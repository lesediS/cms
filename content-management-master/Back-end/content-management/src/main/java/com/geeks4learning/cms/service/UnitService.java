package com.geeks4learning.cms.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.geeks4learning.cms.dto.UnitDTO;
import org.springframework.stereotype.Service;
import com.geeks4learning.cms.model.Unit;

@Service
public interface UnitService {

    // Method to create a new unit
    String createUnit(UUID moduleId, UnitDTO unitDTO);

    // Method to update an existing unit
    Unit updateUnit(UUID unitId, Unit unit);

    // Method to delete a unit by its ID
    void deleteUnit(UUID unitId);

    // Method to find a unit by its ID
    Optional<Unit> findUnitById(UUID unitId);

    // Method to retrieve all units
    List<UnitDTO> getAllUnits();

    // Method to retrieve all units for a specific course
    public List<Unit> getUnitsByModuleId(UUID moduleId);

}
