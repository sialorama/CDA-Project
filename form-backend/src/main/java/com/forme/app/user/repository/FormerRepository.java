package com.forme.app.user.repository;


import com.forme.app.user.model.Former;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * The interface Producer repository.
 */
public interface FormerRepository extends JpaRepository<Former, Long> {
    /**
     * Find by email optional.
     *
     * @param email the email
     * @return the optional
     */
    Optional<Former> findByEmail(String email);
}
