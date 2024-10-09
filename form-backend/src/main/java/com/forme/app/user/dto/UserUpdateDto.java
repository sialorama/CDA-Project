package com.forme.app.user.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The type User update dto.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserUpdateDto {
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private String phone_number;
}
