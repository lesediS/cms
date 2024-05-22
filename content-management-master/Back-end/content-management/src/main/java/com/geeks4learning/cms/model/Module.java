package com.geeks4learning.cms.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Entity
public class Module {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID moduleId = UUID.randomUUID();

    private String name;

    private String description;

    private LocalDateTime dateModified = LocalDateTime.now();
    @Column(length = 1024) // Set the length to 1024 characters

    private String moduleImageURL;

    @OneToMany(mappedBy = "module")
    private List<Unit> units;

    @ManyToMany(mappedBy = "modules", cascade = CascadeType.REMOVE)
    private List<Course> courses = new ArrayList<>();

}