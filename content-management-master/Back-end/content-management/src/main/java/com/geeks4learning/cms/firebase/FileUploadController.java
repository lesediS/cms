package com.geeks4learning.cms.firebase;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/content-management/image")
public class FileUploadController {

    private final FirebaseStorageService storageService;

    public FileUploadController(FirebaseStorageService storageService) {
        this.storageService = storageService;
    }

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        return storageService.uploadFile(file);
    }
}