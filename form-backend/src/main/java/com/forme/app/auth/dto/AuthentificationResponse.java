package com.forme.app.auth.dto;

import com.forme.app.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type Authentification response.
 */
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class AuthentificationResponse {
    private String token;
    private Long id;
    private Role role;
}
