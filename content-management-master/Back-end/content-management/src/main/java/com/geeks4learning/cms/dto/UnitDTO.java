package com.geeks4learning.cms.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.geeks4learning.cms.model.Unit;

import lombok.Data;

@Data
public class UnitDTO {
    private UUID unitId;

    private String unitName;

    private UUID moduleId;

    @JsonIgnore
    private ModuleDTO moduleDTO;

    private LocalDateTime dateModified = LocalDateTime.now();

    private List<ContentDTO> content;

    public static UnitDTO fromUnit(Unit unit) {
        UnitDTO unitDTO = new UnitDTO();
        unitDTO.setUnitId(unit.getUnitId());
        unitDTO.setUnitName(unit.getName());
        unitDTO.setModuleId(unit.getModule().getModuleId());
        unitDTO.setDateModified(unit.getDateModified());
        return unitDTO;
    }

}
