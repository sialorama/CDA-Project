package com.forme.app.model;

import com.forme.app.user.model.Former;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Form {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private boolean isTemplate;

    @Column(columnDefinition = "jsonb")
    private String content;

    @ManyToOne
    @JoinColumn(name = "former_id")
    private Former former;

    private Long createdAt;
    private Long updatedAt;
}
