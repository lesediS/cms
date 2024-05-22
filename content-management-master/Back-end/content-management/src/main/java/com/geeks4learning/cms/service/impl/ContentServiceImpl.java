package com.geeks4learning.cms.service.impl;

import com.geeks4learning.cms.exception.ResourceNotFoundException;
import com.geeks4learning.cms.firebase.FirebaseStorageService;
import com.geeks4learning.cms.model.Content;
import com.geeks4learning.cms.model.Unit;
import com.geeks4learning.cms.repository.ContentRepository;
import com.geeks4learning.cms.repository.UnitRepository;
import com.geeks4learning.cms.service.ContentService;
import jakarta.transaction.Transactional;

import org.hibernate.id.uuid.UuidGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;


@Service
public class ContentServiceImpl implements ContentService {

    private final ContentRepository contentRepository;
    private final UnitRepository unitRepository;

    @Autowired
    private FirebaseStorageService storageService;

    public ContentServiceImpl(ContentRepository contentRepository, UnitRepository unitRepository) {
        this.contentRepository = contentRepository;
        this.unitRepository = unitRepository;
    }

    @Override
    @Transactional
    public Content createVideoUrl(UUID unitId, String videoUrl, String caption) {
        // Fetch the unit from the database using unitId
        Unit unit = unitRepository.findById(unitId)
                .orElseThrow(() -> new ResourceNotFoundException("Unit not found with id: " + unitId));

        // Create a new Content object
        Content content = new Content();
        content.setType("video");
        content.setContentValue(videoUrl); // Store the video URL
        content.setCaption(caption);
        content.setDateModified(LocalDateTime.now());
        content.setUnit(unit);
        // Set the unit for the content
        // Save the content to the database
        return contentRepository.save(content);
    }


    @Override
    public Content createTextContent(UUID unitId, String contentValue, String caption) {
        Unit unit = unitRepository.findById(unitId)
                .orElseThrow(() -> new ResourceNotFoundException("Unit not found with id: " + unitId));

        Content content = new Content();
        content.setType("text");
        content.setContentValue(contentValue);
        content.setCaption(caption);
        content.setDateModified(LocalDateTime.now());
        content.setUnit(unit);

        return contentRepository.save(content);
    }

    @Override
    public Content createImageContent(UUID unitId, MultipartFile imageFile, String caption) throws IOException {
        // Validate unitId
        Unit unit = unitRepository.findById(unitId)
                .orElseThrow(() -> new ResourceNotFoundException("Unit not found with id: " + unitId));

        // Upload image file to Firebase Storage
        String imageUrl = storageService.uploadFile(imageFile);

        // Create content entity
        Content content = new Content();
        content.setType("image");
        content.setContentValue(imageUrl); // Store image URL instead of actual content
        content.setCaption(caption);
        content.setDateModified(LocalDateTime.now());
        content.setUnit(unit);

        return contentRepository.save(content);
    }


    @Override
    public Content createVideoContent(UUID unitId, MultipartFile videoFile, String caption) throws IOException {
        // Validate unitId
        Unit unit = unitRepository.findById(unitId)
                .orElseThrow(() -> new ResourceNotFoundException("Unit not found with id: " + unitId));

        // Upload video file to Firebase Storage
        String videoUrl = storageService.uploadFile(videoFile);

        // Create content entity
        Content content = new Content();
        content.setType("video");
        content.setContentValue(videoUrl); // Store video URL instead of actual content
        content.setCaption(caption);
        content.setDateModified(LocalDateTime.now());
        content.setUnit(unit);

        return contentRepository.save(content);
    }

    @Override
    public Content createDocumentContent(UUID unitId, MultipartFile documentFile, String caption) throws IOException {
        // Validate unitId
        Unit unit = unitRepository.findById(unitId)
                .orElseThrow(() -> new ResourceNotFoundException("Unit not found with id: " + unitId));

        // Upload document file to Firebase Storage
        String documentUrl = storageService.uploadFile(documentFile);

        // Create content entity
        Content content = new Content();
        content.setType("document");
        content.setContentValue(documentUrl); // Store document URL instead of actual content
        content.setCaption(caption);
        content.setDateModified(LocalDateTime.now());
        content.setUnit(unit);

        return contentRepository.save(content);
    }


    @Override
    public Content getContentById(UUID contentId) {
        return contentRepository.findById(contentId)
                .orElseThrow(() -> new ResourceNotFoundException("Content not found with id: " + contentId));
    }

    @Override
    public List<Content> getContentByUnitId(UUID unitId) {
        return contentRepository.findByUnit_unitId(unitId);
    }

}
