package com.geeks4learning.cms.external;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import com.geeks4learning.cms.external.enums.UserRole;

@Data
@Entity
public class Student {
   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   private UUID studentId;
   private String firstname;
    private String lastname;
    private String idNumber;
    private Long batchId;

    private String email;
    private String password;
    private String cellphone;

    private LocalDate creationDate=LocalDate.now();

    @Enumerated(EnumType.STRING)
    private UserRole role;

}
