package com.forme.app.config;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;

@Component
public class KeyGeneratorUtil {
    private static final String PRIVATE_KEY_FILE = "privateKey.key";
    private static final String PUBLIC_KEY_FILE = "publicKey.key";

    /**
     * Generate and store keys.
     *
     * @throws Exception the exception
     */
    @PostConstruct
    public void generateAndStoreKeys() throws Exception {
        // Check if keys already exist
        if (!Files.exists(Paths.get(PRIVATE_KEY_FILE)) || !Files.exists(Paths.get(PUBLIC_KEY_FILE))) {
            KeyPairGenerator keyGen = KeyPairGenerator.getInstance("EC");
            keyGen.initialize(256);
            KeyPair keyPair = keyGen.generateKeyPair();

            PrivateKey privateKey = keyPair.getPrivate();
            PublicKey publicKey = keyPair.getPublic();

            // Store the private key
            Files.write(Paths.get(PRIVATE_KEY_FILE), privateKey.getEncoded());

            // Store the public key
            Files.write(Paths.get(PUBLIC_KEY_FILE), publicKey.getEncoded());

            System.out.println("Keys generated and stored successfully.");
        } else {
            System.out.println("Keys already exist. Skipping generation.");
        }
    }
}
