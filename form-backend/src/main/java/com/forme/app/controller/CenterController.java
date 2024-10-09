package com.forme.app.controller;

import com.forme.app.dto.CenterDto;
import com.forme.app.model.Center;
import com.forme.app.service.CenterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/centers")
@RequiredArgsConstructor
@Tag(name = "Centre")
@CrossOrigin(value = "*")
public class CenterController {
    private final CenterService centerService;

    @GetMapping
    @ResponseBody
    @Operation(summary = "Liste de centre")
    public ResponseEntity<List<Center>> getAll(){
        return ResponseEntity.ok(centerService.getAll());
    }

    @PostMapping
    @ResponseBody
    @Operation(summary = "Créer un nouveau centre")
    public ResponseEntity<Center> create(@Valid @RequestBody CenterDto centerDto){
        System.out.println(centerDto);
        try {
                Center newCenter = centerService.createCenter(centerDto);
                return ResponseEntity.ok(newCenter);
            } catch (Exception e) {
                return ResponseEntity.badRequest().build();
            }
        }

    @DeleteMapping("/{centerId}")
    @ResponseBody
    @Operation(summary = "Supprimer un centre")
    public ResponseEntity<Center> delete(@PathVariable Long centerId){
        boolean rep = centerService.deleteCenter(centerId);
        if (rep) return ResponseEntity.noContent().build();
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/{centerId}")
    @ResponseBody
    @Operation(summary = "Trouver un centre grace à son Id")
    public ResponseEntity<Center> get(@PathVariable Long centerId){
        Center center = centerService.getOne(centerId);
        if (center == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(center);
    }

    @PostMapping("/by_name")
    @ResponseBody
    @Operation(summary = "Trouver un centre grace à son nom")
    public ResponseEntity<Center> getByName(@RequestBody String name){
        Center center = centerService.getByName(name);
        if (center == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(center);
    }
}
