package com.geeks4learning.cms.controller;

import com.geeks4learning.cms.dto.ContentDTO;
import com.geeks4learning.cms.exception.ResourceNotFoundException;
import com.geeks4learning.cms.model.Content;
import com.geeks4learning.cms.service.ContentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/content-management/units/content")
public class ContentController {

    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping("/{contentId}")
    public ResponseEntity<ContentDTO> getContentById(@PathVariable UUID contentId) {
        try {
            Content content = contentService.getContentById(contentId);
            ContentDTO contentDTO = convertToDTO(content);
            return new ResponseEntity<>(contentDTO, HttpStatus.OK);
        } catch (ResourceNotFoundException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/unit/{unitId}")
    public ResponseEntity<?> getContentByUnitId(@PathVariable UUID unitId) {
        List<ContentDTO> contentDTOs = contentService.getContentByUnitId(unitId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        if (contentDTOs.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(contentDTOs, HttpStatus.OK);
        }
    }

    private ContentDTO convertToDTO(Content content) {
        ContentDTO dto = new ContentDTO();
        dto.setContentId(content.getContentId());
        dto.setType(content.getType());
        dto.setContentValue(content.getContentValue());
        dto.setCaption(content.getCaption());
        dto.setDateModified(content.getDateModified());
        return dto;
    }

    @PostMapping("/video/{unitId}")
    public ResponseEntity<?> createVideoContent(@PathVariable UUID unitId,
            @RequestParam("videoFile") MultipartFile videoFile,
            @RequestParam("caption") String caption) {
        try {
            Content content = contentService.createVideoContent(unitId, videoFile, caption);
            return new ResponseEntity<>(content, HttpStatus.CREATED);
        } catch (ResourceNotFoundException ex) {
            return new ResponseEntity<>("Unit not found", HttpStatus.NOT_FOUND);
        } catch (IOException e) {
            return new ResponseEntity<>("Error uploading video", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/document/{unitId}")
    public ResponseEntity<?> createDocumentContent(@PathVariable UUID unitId,
            @RequestParam("documentFile") MultipartFile documentFile,
            @RequestParam("caption") String caption) {
        try {
            Content content = contentService.createDocumentContent(unitId, documentFile, caption);
            return new ResponseEntity<>(content, HttpStatus.CREATED);
        } catch (ResourceNotFoundException ex) {
            return new ResponseEntity<>("Unit not found", HttpStatus.NOT_FOUND);
        } catch (IOException e) {
            return new ResponseEntity<>("Error uploading document", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/image/{unitId}")
    public ResponseEntity<?> createImageContent(@PathVariable UUID unitId,
            @RequestParam("imageFile") MultipartFile imageFile,
            @RequestParam("caption") String caption) {
        try {
            Content content = contentService.createImageContent(unitId, imageFile, caption);
            return new ResponseEntity<>(content, HttpStatus.CREATED);
        } catch (ResourceNotFoundException ex) {
            return new ResponseEntity<>("Unit not found", HttpStatus.NOT_FOUND);
        } catch (IOException e) {
            return new ResponseEntity<>("Error uploading image", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/text/{unitId}")
    public ResponseEntity<?> createTextContent(@PathVariable UUID unitId,
            @RequestParam("textContent") String textContent,
            @RequestParam("caption") String caption) {
        try {
            Content content = contentService.createTextContent(unitId, textContent, caption);
            return new ResponseEntity<>(content, HttpStatus.CREATED);
        } catch (ResourceNotFoundException ex) {
            return new ResponseEntity<>("Unit not found", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/video-url/{unitId}")
    public ResponseEntity<?> createVideoContentWithUrl(@PathVariable UUID unitId,
            @RequestParam("videoUrl") String videoUrl,
            @RequestParam("caption") String caption) {
        try {
            Content content = contentService.createVideoUrl(unitId, videoUrl, caption);
            return new ResponseEntity<>(content, HttpStatus.CREATED);
        } catch (ResourceNotFoundException ex) {
            return new ResponseEntity<>("Unit not found", HttpStatus.NOT_FOUND);
        }
    }

}
