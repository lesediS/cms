package com.geeks4learning.cms.firebase;

import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class FirebaseStorageService {

    public String uploadFile(MultipartFile file) throws IOException {
        // Generate a unique filename
        String filename = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();

        // Get reference to the Firebase Storage bucket
        Bucket bucket = StorageClient.getInstance().bucket();

        // Upload file to Firebase Storage
        bucket.create(filename, file.getBytes(), file.getContentType());

        // Get download URL for the uploaded file
        String downloadUrl = bucket.get(filename).signUrl(1, TimeUnit.DAYS).toString();

        return downloadUrl;
    }
}