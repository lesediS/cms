package com.geeks4learning.cms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Entity
public class Unit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID unitId = UUID.randomUUID();
    //private Long unitId;

    private String name;

    private LocalDateTime dateModified = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "moduleId")
    @JsonIgnore // Prevents serialization of module details
    private Module module;

    @OneToMany(mappedBy = "unit")
    List<Content> content;

}
