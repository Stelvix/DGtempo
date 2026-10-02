package fr.dgtempo.controller;

import fr.dgtempo.dto.PointageResponse;
import fr.dgtempo.entity.Pointage;
import org.springframework.web.bind.annotation.RestController;
import fr.dgtempo.services.PointageService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/pointages")
@RequiredArgsConstructor
public class PointageController {
    private static final String USER_ID_SESSION_KEY = "authenticatedUserId";

    private final PointageService pointageService;

    @GetMapping("/du-jour")
    public PointageResponse recupererPointageDuJour(HttpServletRequest request) {
        Long userId = utilisateurConnecte(request);
        return pointageService.recupererPointageDuJour(userId)
                .map(PointageResponse::from)
                .orElseGet(() -> PointageResponse.empty(LocalDate.now()));
    }

    @GetMapping("/historique")
    public List<PointageResponse> recupererHistorique(HttpServletRequest request) {
        Long userId = utilisateurConnecte(request);
        return pointageService.recupererHistorique(userId).stream()
                .map(PointageResponse::from)
                .toList();
    }

    // Endpoint pour enregistrer l'arrivée
    @PostMapping("/arrivee")
    @ResponseStatus(HttpStatus.CREATED)
    public void enregistrerArrivee(HttpServletRequest request) {
        pointageService.enregistrerArrivee(utilisateurConnecte(request));
    }

    // Endpoint pour enregistrer la pause
    @PostMapping("/pause")
    @ResponseStatus(HttpStatus.OK)
    public void enregistrerPause(HttpServletRequest request) {
        pointageService.enregistrerPause(utilisateurConnecte(request));
    }

    // Endpoint pour enregistrer le retour de pause
    @PostMapping("/reprise")
    @ResponseStatus(HttpStatus.OK)
    public void enregistrerReprise(HttpServletRequest request) {
        pointageService.enregistrerReprise(utilisateurConnecte(request));
    }

    // Endpoint pour enregistrer le départ
    @PostMapping("/depart")
    @ResponseStatus(HttpStatus.OK)
    public void enregistrerDepart(HttpServletRequest request) {
        pointageService.enregistrerDepart(utilisateurConnecte(request));
    }

    private Long utilisateurConnecte(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Object userId = session == null ? null : session.getAttribute(USER_ID_SESSION_KEY);

        if (userId instanceof Long id) {
            return id;
        }

        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Connexion requise.");
    }
}