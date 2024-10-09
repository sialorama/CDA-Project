package com.forme.app.user.dto;

import com.forme.app.user.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type User list dto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserListDto {
    private String firstname;
    private String lastname;
    private String email;
    private Role role;
}
