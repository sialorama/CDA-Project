package com.forme.app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

/**
 * The type Phase.
 */
@Entity
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Phase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "path_id")
    private Path path;

    @OneToMany(mappedBy = "phase")
    private List<Workshop> workshops;

    private String name;
}
