package com.geeks4learning.cms.firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FireBaseConfig {

    @Bean
    public FirebaseApp firebaseApp() throws IOException {
        // Check if a FirebaseApp instance with the name "DEFAULT" already exists
        if (FirebaseApp.getApps().isEmpty()) {
            String serviceAccountPath = "Back-end\\content-management\\src\\main\\java\\com\\geeks4learning\\cms\\serviceAccountKey.json";

            FileInputStream serviceAccount = new FileInputStream(serviceAccountPath);

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setStorageBucket("content-management-1ee21.appspot.com")
                    .build();

            return FirebaseApp.initializeApp(options);
        } else {
            // If a FirebaseApp instance with the name "DEFAULT" already exists, return it
            return FirebaseApp.getInstance();
        }
    }
}
