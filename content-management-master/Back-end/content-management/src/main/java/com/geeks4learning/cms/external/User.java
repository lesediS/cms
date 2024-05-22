package com.geeks4learning.cms.external;

import java.time.LocalDate;
import java.util.UUID;

import com.geeks4learning.cms.external.enums.UserRole;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public abstract  class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String userId = UUID.randomUUID().toString();


    private String firstname;
    private String lastname;
    private String idNumber;

    private String email;
    private String password;
    private String cellphone;




    private LocalDate creationDate=LocalDate.now();

    @Enumerated(EnumType.STRING)
    private UserRole role;









}