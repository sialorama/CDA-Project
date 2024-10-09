package com.forme.app.user.dto;

import com.forme.app.model.Assessment;
import com.forme.app.model.Path;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FormerDto {
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String phone_number;
    private List<Path> paths;
    private List<Assessment> assessments;
}
