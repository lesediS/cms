package com.geeks4learning.cms.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Course {

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private UUID courseId = UUID.randomUUID();

        private String name;

        private String description;
        private LocalDateTime dateModified = LocalDateTime.now();
        @Column(length = 1024) // Set the length to 1024 characters
        private String courseImageURL;

        @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
        @JoinTable(name = "course_module", joinColumns = @JoinColumn(name = "course_id"), inverseJoinColumns = @JoinColumn(name = "module_id"))
        private List<Module> modules = new ArrayList<>();

}
