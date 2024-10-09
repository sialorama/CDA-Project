package com.forme.app.repository;

import com.forme.app.model.Center;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CenterRepository extends JpaRepository<Center, Long> {
    @Query("select n from Center n where n.name = :name")
    Center findByName(String name);
}
