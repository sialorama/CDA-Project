package com.forme.app.user.repository;


import com.forme.app.user.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * The interface Client repository.
 */
public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    /**
     * Find by email optional.
     *
     * @param email the email
     * @return the optional
     */
    Optional<Candidate> findByEmail(String email);
}
