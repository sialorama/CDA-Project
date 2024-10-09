package com.forme.app.dto;

import com.forme.app.user.model.Former;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FormDto {
    private String id;
    private String title;
    private String description;
    private boolean isTemplate;
    private String content;
    private Former former;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
