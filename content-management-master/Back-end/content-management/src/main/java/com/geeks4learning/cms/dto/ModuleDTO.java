package com.geeks4learning.cms.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

//import com.google.api.services.storage.Storage.BucketAccessControls.List;

import lombok.Data;

@Data
public class ModuleDTO {

    private UUID moduleId;
    private String name;
    private String description;
    private LocalDateTime dateModified = LocalDateTime.now();
    private String moduleImageURL;
    List<UnitDTO> units;

}
