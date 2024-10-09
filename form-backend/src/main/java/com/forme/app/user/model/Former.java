package com.forme.app.user.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.forme.app.model.Assessment;
import com.forme.app.model.Form;
import com.forme.app.model.Path;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.context.annotation.Lazy;

import java.util.List;

/**
 * The type Producer.
 */
@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@SuperBuilder
@NoArgsConstructor
@PrimaryKeyJoinColumn(name = "id")
public class Former extends User {
    @OneToMany(mappedBy = "former", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Path> paths;

    @OneToMany(mappedBy = "former", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Assessment> assessments;

    @OneToMany(mappedBy = "former", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Form> forms;
}
