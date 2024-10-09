package com.forme.app.service;

import com.forme.app.model.Form;
import com.forme.app.repository.FormRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FormService {
    public final FormRepository formRepository;

    public List<Form> findAll() {
        return formRepository.findAll();
    }

    public Form findById(Long id) {
        return formRepository.findById(id).orElseThrow();
    }

    public Form save(Form form) {
        return formRepository.save(form);
    }

    public boolean delete(Long id) {
        try {

        formRepository.delete(findById(id));
        return true;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    public Form findByName(String title) {
        return formRepository.findAllByTitle(title);
    }
}
