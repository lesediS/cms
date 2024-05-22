package com.geeks4learning.cms.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Data

@Entity
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID contentId = UUID.randomUUID();

    private String type; // text, image, video, etc.
    @Lob
    private String contentValue;// For text content or image/video URLs
    private String caption; // For images or videos
    private LocalDateTime dateModified = LocalDateTime.now();

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "unitId")
    private Unit unit;

}