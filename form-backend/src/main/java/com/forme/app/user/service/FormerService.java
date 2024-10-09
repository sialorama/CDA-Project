package com.forme.app.user.service;

import com.forme.app.user.model.Former;
import com.forme.app.user.repository.FormerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FormerService {
    private final FormerRepository formerRepository;

    public List<Former> getAll() {
        return formerRepository.findAll();
    }
}
