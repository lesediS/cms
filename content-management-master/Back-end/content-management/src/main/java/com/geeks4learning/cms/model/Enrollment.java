package com.geeks4learning.cms.model;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID enrollmentId = UUID.randomUUID();

    private UUID adminId;

    private UUID courseId;

    private UUID studentId;

    private String enrollmentDate;

    private String cancelled;

    private String cancellationReason;

}
