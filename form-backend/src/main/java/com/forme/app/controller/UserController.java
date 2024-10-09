package com.forme.app.controller;


import com.forme.app.auth.dto.AuthentificationResponse;
import com.forme.app.user.dto.FormerDto;
import com.forme.app.user.Role;
import com.forme.app.user.dto.CandidateDto;
import com.forme.app.user.dto.UserDto;
import com.forme.app.user.dto.UserListDto;
import com.forme.app.user.dto.UserUpdateDto;
import com.forme.app.user.model.User;
import com.forme.app.user.service.CandidateService;
import com.forme.app.user.service.FormerService;
import com.forme.app.user.service.UserService;
import com.forme.app.utils.MapperDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * The type User controller.
 */
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Tag(name = "Users", description = "API gestion utilisateurs")
@CrossOrigin(value = "*")
public class UserController {
    private final UserService userService;
    private final CandidateService candidateService;
    private final FormerService formerService;

    /**
     * Gets all users.
     *
     * @return the all users
     */
    @GetMapping
    @ResponseBody
    @Operation(summary = "Liste des users")
    public ResponseEntity<List<UserListDto>> getAllUsers() {
        List<UserListDto> userListDtos = userService.getAllUsers().stream()
                .filter(user -> user.getRole() != Role.ADMIN)
                .map(user -> MapperDTO.convertToDto(user, UserListDto.class)).toList();
        return ResponseEntity.ok(userListDtos);
    }


    //TODO: get all candidate or former
    @GetMapping("/formers")
    @ResponseBody
    @Operation(summary = "Liste de formateurs")
    public ResponseEntity<List<FormerDto>> getAllFormers() {
        List<FormerDto> formers = formerService.getAll().stream()
                .map(former -> MapperDTO.convertToDto(former, FormerDto.class)).toList();
        return ResponseEntity.ok(formers);
    }

    //INFO: Websocket created for realtime if you needed
    @GetMapping("/candidates")
    @ResponseBody
    @Operation(summary = "Liste des candidats")
    public ResponseEntity<List<CandidateDto>> getAllCandidates() {
        List<CandidateDto> candidates = candidateService.findAll().stream()
                .map(candidate -> MapperDTO.convertToDto(candidate, CandidateDto.class))
                .toList();
        return ResponseEntity.ok(candidates);
    }


    /**
     * Gets user by id.
     *
     * @param id the id
     * @return the user by id
     */
    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user == null) {
            return ResponseEntity.badRequest().build();
        }

        if (user.getRole() == Role.ADMIN) {
            return ResponseEntity.status(201).build();
        }
        return ResponseEntity.ok(MapperDTO.convertToDto(user, UserDto.class));
    }

    /**
     * Update user response entity.
     *
     * @param id          the id
     * @param updatedUser the updated user
     * @return the response entity
     */
    @PutMapping("/{id}")
    @ResponseBody
    public ResponseEntity<AuthentificationResponse> updateUser(@PathVariable Long id, @RequestBody UserUpdateDto updatedUser) {
        return ResponseEntity.ok(userService.updateUser(id, updatedUser));
    }

    /**
     * Delete user response entity.
     *
     * @param id the id
     * @return the response entity
     */
    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Boolean> deleteUser(@PathVariable Long id) {
        boolean result = userService.deleteUser(id);
        if (result) return ResponseEntity.noContent().build();
        return ResponseEntity.badRequest().build();
    }
}
