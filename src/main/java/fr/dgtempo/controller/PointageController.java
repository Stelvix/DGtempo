package fr.dgtempo.controller;

import org.springframework.web.bind.annotation.RestController;
import fr.dgtempo.services.PointageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pointages")
@RequiredArgsConstructor
public class PointageController {
    private final PointageService pointageService;

    // Endpoint pour enregistrer l'arrivée
    @PostMapping("/arrivee")
    @ResponseStatus(HttpStatus.CREATED)
    public void enregistrerArrivee() {
        pointageService.enregistrerArrivee();
    }

    // Endpoint pour enregistrer la pause
    @PostMapping("/pause")
    @ResponseStatus(HttpStatus.OK)
    public void enregistrerPause() {
        pointageService.enregistrerPause();
    }

    // Endpoint pour enregistrer le retour de pause
    @PostMapping("/reprise")
    @ResponseStatus(HttpStatus.OK)
    public void enregistrerReprise() {
        pointageService.enregistrerReprise();
    }

    // Endpoint pour enregistrer le départ
    @PostMapping("/depart")
    @ResponseStatus(HttpStatus.OK)
    public void enregistrerDepart() {
        pointageService.enregistrerDepart();
    }
}
