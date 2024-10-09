package com.forme.app.user.dto;

import com.forme.app.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type User dto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private Role role;
    private String phone_number;
}
