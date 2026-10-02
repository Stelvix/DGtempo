package fr.dgtempo.controller;

import fr.dgtempo.entity.Users;
import fr.dgtempo.dto.UserResponse;
import fr.dgtempo.services.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Locale;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserResponse> creerUtilisateur(
            @Valid @RequestBody CreateUserRequest request) {
        Users utilisateur = new Users();
        utilisateur.setUsername(request.username().trim());
        utilisateur.setEmail(request.email().trim().toLowerCase(Locale.ROOT));
        utilisateur.setPassword(request.password());

        Users utilisateurCree = userService.enregistrerUtilisateur(utilisateur);
        return ResponseEntity.status(HttpStatus.CREATED).body(UserResponse.from(utilisateurCree));
    }

    public record CreateUserRequest(
            @NotBlank @Size(max = 255) String username,
            @NotBlank @Email @Size(max = 255) String email,
            @NotBlank @Size(min = 8) String password) {
    }
}