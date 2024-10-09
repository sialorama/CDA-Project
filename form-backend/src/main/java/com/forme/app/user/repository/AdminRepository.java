package com.forme.app.user.repository;


import com.forme.app.user.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * The interface Admin repository.
 */
public interface AdminRepository extends JpaRepository<Admin, Long> {
    /**
     * Find by email optional.
     *
     * @param email the email
     * @return the optional
     */
    Optional<Admin> findByEmail(String email);
}
