package com.forme.app.controller;

import com.forme.app.dto.PathDto;
import com.forme.app.dto.PathListDto;
import com.forme.app.model.Path;
import com.forme.app.service.PathService;
import com.forme.app.utils.MapperDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/classes")
@RequiredArgsConstructor
@Tag(name = "Classes", description = "API gestion des classe")
@CrossOrigin(value = "*")
public class PathController {
    private final PathService pathService;

    @GetMapping
    @ResponseBody
    @Operation(summary = "Liste des classes")
    public ResponseEntity<List<PathListDto>> getAll(){
        List<Path> paths = pathService.getAll();
        paths.forEach(path -> {
            System.out.println("Path ID: " + path.getId());
            System.out.println("Start Date: " + path.getDate_start());
            System.out.println("End Date: " + path.getDate_end());
        });
        List<PathListDto> classes = paths.stream()
                .map(classe -> MapperDTO.convertToDto(classe, PathListDto.class))
                .toList();
        return ResponseEntity.ok(classes);
    }

    // create classes
    @PostMapping
    @ResponseBody
    @Operation(summary = "Créer une nouvelle classe")
    public ResponseEntity<PathDto> create(@RequestBody PathDto classeDto){
        System.out.println(classeDto);

        Path path = pathService.create(classeDto);
        if (path == null) return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(MapperDTO.convertToDto(path,PathDto.class));
    }

    // delete classes
    @DeleteMapping("/{classeId}")
    @ResponseBody
    @Operation(summary = "Supprimer une classe")
    public ResponseEntity<?> delete(@PathVariable Long classeId){
        boolean result = pathService.delete(classeId);
        if (result) return ResponseEntity.noContent().build();
        return ResponseEntity.badRequest().build();
    }

    // getOne classes
    @GetMapping("/{classeId}")
    @ResponseBody
    @Operation(summary = "Trouver une classe par id")
    public ResponseEntity<PathDto> getById(@PathVariable Long classeId){
        Path path = pathService.getById(classeId);
        if (path == null) return ResponseEntity.badRequest().build();
        return ResponseEntity.ok(MapperDTO.convertToDto(path,PathDto.class));
    }
}
