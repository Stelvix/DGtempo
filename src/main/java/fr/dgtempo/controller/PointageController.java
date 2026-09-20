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

}
