package com.geeks4learning.cms.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.geeks4learning.cms.model.Module;

@Repository
public interface ModuleRepository extends JpaRepository<Module, UUID> {

}
