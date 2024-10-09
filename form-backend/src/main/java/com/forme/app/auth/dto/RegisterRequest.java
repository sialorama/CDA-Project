package com.forme.app.auth.dto;

import com.forme.app.user.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type Register request.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterRequest {
    private String firstname;
    private String lastname;
    @Email
    private String email;
    @Size(min = 6, max = 20)
    private String password;
    private Role role;
    private String phone_number;


}
