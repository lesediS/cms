package com.geeks4learning.cms.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class ContentDTO {
    private UUID contentId;
    private String type;
    private String contentValue;
    private String caption;
    private LocalDateTime dateModified = LocalDateTime.now();

    @JsonBackReference // Prevents serialization of the unit field to avoid circular reference
    private UnitDTO unit;
}
