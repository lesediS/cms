package com.geeks4learning.cms.service;

import com.geeks4learning.cms.model.Content;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public interface ContentService {

    Content getContentById(UUID contentId);

    List<Content> getContentByUnitId(UUID unitId);

    Content createTextContent(UUID unitId, String contentValue, String caption);

    Content createImageContent(UUID unitId, MultipartFile imageFile, String caption) throws IOException;

    Content createVideoContent(UUID unitId, MultipartFile videoFile, String caption) throws IOException;

    Content createDocumentContent(UUID unitId, MultipartFile documentFile, String caption) throws IOException;

    Content createVideoUrl(UUID unitId, String videoUrl, String caption);
}
