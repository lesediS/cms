package com.geeks4learning.cms.simul.Admin;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.geeks4learning.cms.external.Admin;

public interface AdminRepo extends JpaRepository<Admin, UUID> {

}
