package com.forme.app.user.dto;

import com.forme.app.model.Path;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CandidateDto {
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String phone_number;
    private Path path;
}
