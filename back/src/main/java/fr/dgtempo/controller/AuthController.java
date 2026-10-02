package fr.dgtempo.controller;

import fr.dgtempo.dto.UserResponse;
import fr.dgtempo.entity.Users;
import fr.dgtempo.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private static final String USER_ID_SESSION_KEY = "authenticatedUserId";

    private final UserService userService;

    @PostMapping("/login")
    public UserResponse login(@Valid @RequestBody LoginRequest request, HttpServletRequest servletRequest) {
        Users user = userService.authentifier(request.email(), request.password());

        HttpSession previousSession = servletRequest.getSession(false);
        if (previousSession != null) {
            previousSession.invalidate();
        }

        HttpSession session = servletRequest.getSession(true);
        session.setAttribute(USER_ID_SESSION_KEY, user.getId());
        return UserResponse.from(user);
    }

    @GetMapping("/me")
    public UserResponse currentUser(HttpServletRequest servletRequest) {
        HttpSession session = servletRequest.getSession(false);
        Object userId = session == null ? null : session.getAttribute(USER_ID_SESSION_KEY);

        if (!(userId instanceof Long id)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Connexion requise.");
        }

        return UserResponse.from(userService.recupererUtilisateurParId(id));
    }

    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void logout(HttpServletRequest servletRequest) {
        HttpSession session = servletRequest.getSession(false);
        if (session != null) {
            session.invalidate();
        }
    }

    public record LoginRequest(@NotBlank @Email String email, @NotBlank String password) {
    }
}