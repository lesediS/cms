package com.geeks4learning.cms.repository;

import com.geeks4learning.cms.model.Content;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ContentRepository extends JpaRepository<Content, UUID> {
    List<Content> findByUnit_unitId(UUID unitId);
    // findByModule_moduleId

}
