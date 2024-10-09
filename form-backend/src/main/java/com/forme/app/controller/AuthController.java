package com.forme.app.controller;

import com.forme.app.auth.AuthService;
import com.forme.app.auth.dto.AuthenticationRequest;
import com.forme.app.auth.dto.AuthentificationResponse;
import com.forme.app.auth.dto.RegisterRequest;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * The type Auth controller.
 */
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "login")
@CrossOrigin(value = "*")
public class AuthController {
    private final AuthService authService;


    /**
     * Register response entity.
     *
     * @param request the request
     * @return the response entity
     */
    @SneakyThrows
    @PostMapping("/signup")
    public ResponseEntity<AuthentificationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    /**
     * Login response entity.
     *
     * @param request the request
     * @return the response entity
     */
    @SneakyThrows
    @PostMapping("/login")
    public ResponseEntity<AuthentificationResponse> login(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }


}
