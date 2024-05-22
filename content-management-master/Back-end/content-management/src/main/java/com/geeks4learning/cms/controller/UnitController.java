package com.geeks4learning.cms.controller;

import com.geeks4learning.cms.dto.UnitDTO;
import com.geeks4learning.cms.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.geeks4learning.cms.model.Unit;
import com.geeks4learning.cms.service.UnitService;
//import com.google.api.services.storage.Storage.BucketAccessControls.List;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/content-management/units")
public class UnitController {

    @Autowired
    private UnitService unitService;

    @GetMapping
    public ResponseEntity<List<UnitDTO>> getAllUnits() {
        List<UnitDTO> units = unitService.getAllUnits();
        return new ResponseEntity<>(units, HttpStatus.OK);
    }

    @GetMapping("/{unitId}")
    public ResponseEntity<UnitDTO> getUnitById(@PathVariable UUID unitId) {
        Optional<Unit> unitOptional = unitService.findUnitById(unitId);
        return unitOptional.map(unit -> new ResponseEntity<>(UnitDTO.fromUnit(unit), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/module/{moduleId}")
    public ResponseEntity<List<Unit>> getUnitsByModuleId(@PathVariable UUID moduleId) {
        List<Unit> units = unitService.getUnitsByModuleId(moduleId);
        if (units.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(units, HttpStatus.OK);
        }
    }

    @PostMapping("/{moduleId}")
    public ResponseEntity<String> createUnit(@PathVariable UUID moduleId, @RequestBody UnitDTO unitDTO) {
        try {
            String string = unitService.createUnit(moduleId, unitDTO);

            return new ResponseEntity<>(string, HttpStatus.CREATED);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    @PutMapping("/{unitId}")
    public ResponseEntity<Unit> updateUnit(@PathVariable UUID unitId, @RequestBody Unit unit) {
        Unit updatedUnit = unitService.updateUnit(unitId, unit);
        return new ResponseEntity<>(updatedUnit, HttpStatus.OK);
    }

    @DeleteMapping("/{unitId}")
    public ResponseEntity<Void> deleteUnit(@PathVariable UUID unitId) {
        unitService.deleteUnit(unitId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}