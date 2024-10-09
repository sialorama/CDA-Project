package com.forme.app.service;

import com.forme.app.dto.PathDto;
import com.forme.app.model.Center;
import com.forme.app.model.Path;
import com.forme.app.repository.CenterRepository;
import com.forme.app.repository.PathRepository;
import com.forme.app.user.model.Former;
import com.forme.app.user.repository.FormerRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;


@Service
@RequiredArgsConstructor
public class PathService {
    private final PathRepository pathRepository;
    private final CenterRepository centerRepository;
    private final FormerRepository formerRepository;

    public List<Path> getAll() {
        return pathRepository.findAll();
    }

    public Path create(PathDto pathDto){
        var centerId = Long.parseLong(pathDto.getCenter_id());
        var formerId = Long.parseLong(pathDto.getFormer_id());

        Center center = centerRepository.findById(centerId).orElseThrow();
        Former former = formerRepository.findById(formerId).orElseThrow();
        Path path = Path.builder()
                .center(center)
                .former(former)
                .date_start(pathDto.getDate_start())
                .date_end(pathDto.getDate_end())
                .build();

        try {
            Path savedPath = pathRepository.save(path);
        } catch (Exception e) {
            System.err.println("Error saving path: " + e.getMessage());
        }

        return path;
    }



    public boolean delete(Long id){
        try {
            pathRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Path getById(Long id) {
        return pathRepository.findById(id).orElse(null);
    }
}
