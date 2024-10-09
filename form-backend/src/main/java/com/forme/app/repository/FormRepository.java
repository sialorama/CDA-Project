package com.forme.app.repository;

import com.forme.app.model.Form;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface FormRepository extends JpaRepository<Form, Long> {
    Form findAllByTitle(String title);
}
