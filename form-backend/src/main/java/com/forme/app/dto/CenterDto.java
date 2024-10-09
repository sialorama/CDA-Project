package com.forme.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CenterDto {
    private Long id;

    @NotBlank(message="Le nom ne peut pas être vide")
    private String name;
    
    @NotBlank(message="L'adresse ne peut pas être vide")
    private String address;

    @NotBlank(message="Le numéro de téléphone est requis")
    private String phone_number;


    // private List<Path> paths;
}
