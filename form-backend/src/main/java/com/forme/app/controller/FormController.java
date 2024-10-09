package com.forme.app.controller;

import com.forme.app.dto.FormDto;
import com.forme.app.model.Form;
import com.forme.app.service.FormService;
import com.forme.app.utils.MapperDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/forms")
@RequiredArgsConstructor
@Tag(name = "Formulaires", description = "API gestion des formulaire")
@CrossOrigin(value = "*")
public class FormController {

    private final FormService formService;

    @GetMapping
    @ResponseBody
    @Operation(summary = "Liste de formulaires")
    public ResponseEntity<List<FormDto>> getAll(){
        return ResponseEntity.ok(
                formService.findAll()
                .stream()
                .map(form -> MapperDTO.convertToDto(form, FormDto.class))
                .toList());
    }

    @PostMapping
    @ResponseBody
    @Operation(summary = "Créer un nouveau formulaire")
    public ResponseEntity<FormDto> save(@RequestBody FormDto formDto) {
        try {
            Form form = formService.save(MapperDTO.convertToEntity(formDto, Form.class));
            return  ResponseEntity.ok(MapperDTO.convertToDto(form, FormDto.class));
        } catch (Exception e) {
            return  ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{formId}")
    @ResponseBody
    @Operation(summary = "Trouver un formulaire grace à son Id")
    public ResponseEntity<FormDto> getById(@PathVariable Long formId) {
        try {
            Form form = formService.findById(formId);
            return  ResponseEntity.ok(MapperDTO.convertToDto(form, FormDto.class));
        } catch (Exception e) {
            return  ResponseEntity.badRequest().build();
        }

    }

    @DeleteMapping("/{id}")
    @ResponseBody
    @Operation(summary = "Supprimer un formulaire grace à son Id")
    public ResponseEntity delete(@PathVariable Long id) {
        boolean res = formService.delete(id);
        if (res)  {
            return ResponseEntity.noContent().build();
        }
        return  ResponseEntity.badRequest().build();
    }

}
