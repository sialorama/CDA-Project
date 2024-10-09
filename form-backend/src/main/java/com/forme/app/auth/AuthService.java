package com.forme.app.auth;

import com.forme.app.auth.dto.AuthenticationRequest;
import com.forme.app.auth.dto.AuthentificationResponse;
import com.forme.app.auth.dto.RegisterRequest;
import com.forme.app.config.JwtService;
import com.forme.app.user.model.Admin;
import com.forme.app.user.model.Candidate;
import com.forme.app.user.model.Former;
import com.forme.app.user.model.User;
import com.forme.app.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Optional;

/**
 * The type Auth service.
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * Register authentification response.
     *
     * @param request the request
     * @return the authentification response
     * @throws Exception the exception
     */
    public AuthentificationResponse register(RegisterRequest request) throws Exception {
        if (request.getRole() == null) {
            return null;
        }


        User user = switch (request.getRole()) {
            case ADMIN -> Admin.builder()
                    .firstname(request.getFirstname())
                    .lastname(request.getLastname())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(request.getRole())
                    .phone_number(request.getPhone_number())
                    .build();
            case CANDIDATE -> Candidate.builder()
                    .firstname(request.getFirstname())
                    .lastname(request.getLastname())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(request.getRole())
                    .phone_number(request.getPhone_number())
                    .build();
            case FORMER -> Former.builder()
                    .firstname(request.getFirstname())
                    .lastname(request.getLastname())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(request.getRole())
                    .phone_number(request.getPhone_number())
                    .build();
        };

        assert user != null;

        userRepository.save(user);

        var jwtToken = jwtService.generateToken(new HashMap<>(), user);

        return AuthentificationResponse.builder()
                .token(jwtToken)
                .build();
    }

    /**
     * Authenticate authentification response.
     *
     * @param request the request
     * @return the authentification response
     * @throws Exception the exception
     */
    public AuthentificationResponse authenticate(AuthenticationRequest request) throws Exception {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        Optional<User> userData = userRepository.findByEmail(request.getEmail());

        if (userData.isEmpty()) {
            throw new Exception("Invalid email or password");
        }

        User user = userData.get();
        if (user.getId() == null) {
            throw new Exception("User ID is null");
        }

        var token = jwtService.generateToken(user);
        return AuthentificationResponse.builder()
                .token(token)
                .id(user.getId())
                .role(user.getRole())
                .build();
    }
}
