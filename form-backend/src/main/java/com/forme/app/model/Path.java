package com.forme.app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.forme.app.user.model.Candidate;
import com.forme.app.user.model.Former;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

/**
 * The type Path.
 */
@Entity
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Path {
    @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne  
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;

    @ManyToOne
    @JoinColumn(name = "center_id")
    private Center center;

    @ManyToOne
    @JoinColumn(name = "former_id", nullable = false)
    private Former former;

    @ManyToOne
    @JoinColumn(name = "ft_advisor_id")
    private FranceTravailAdvisor ftAdvisor;

    @JsonIgnore
    @OneToMany(mappedBy = "path", fetch = FetchType.LAZY)
    private List<Phase> phases;

    @JsonIgnore
    @OneToMany(mappedBy = "path", fetch = FetchType.LAZY)
    private List<Document> documents;

    @JsonIgnore
    @OneToOne(mappedBy = "path")
    private ExitAssessment exitAssessment;

    private Timestamp date_start;

    private Timestamp date_end;

    private boolean adherence;
    private String non_adherence_reason;
}
