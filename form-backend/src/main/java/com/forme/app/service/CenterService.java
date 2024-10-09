package com.forme.app.service;

import com.forme.app.dto.CenterDto;
import com.forme.app.model.Center;
import com.forme.app.repository.CenterRepository;
import com.forme.app.utils.MapperDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CenterService {
    private final CenterRepository centerRepository;

    public List<Center> getAll(){
        return centerRepository.findAll();
    }

    public Center createCenter(CenterDto newCenter) {
        System.out.println(newCenter.toString());
        Center center = MapperDTO.convertToEntity(newCenter, Center.class);
        return centerRepository.save(center);
    }

    public boolean deleteCenter(Long id) {
        Center center = centerRepository.findById(id).orElse(null);
        if (center != null) {
            centerRepository.delete(center);
            return true;
        } else {
            return false;
        }
    }

    public Center getOne(Long id) {
        return centerRepository.findById(id).orElse(null);
    }

    public Center getByName(String name) {
        return centerRepository.findByName(name);
    }
}
