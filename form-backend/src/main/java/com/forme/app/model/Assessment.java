package com.forme.app.model;

import com.forme.app.user.model.Former;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

/**
 * The type Assessment.
 */
@Entity
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Assessment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "engagement_id")
    private Engagement engagement;
    private String former_comments;

    @ManyToOne
    @JoinColumn(name = "former_id")
    private Former former;
}
