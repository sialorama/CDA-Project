package com.forme.app.user.service;

import com.forme.app.user.model.Candidate;
import com.forme.app.user.repository.CandidateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CandidateService {
    private final CandidateRepository candidateRepository;

    public List<Candidate> findAll() {
        return candidateRepository.findAll();
    }
}
