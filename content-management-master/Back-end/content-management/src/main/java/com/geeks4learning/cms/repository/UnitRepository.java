package com.geeks4learning.cms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.geeks4learning.cms.model.Unit;

import java.util.List;
import java.util.UUID;

@Repository
public interface UnitRepository extends JpaRepository<Unit, UUID> {

    List<Unit> findByModule_moduleId(UUID moduleId);
}
