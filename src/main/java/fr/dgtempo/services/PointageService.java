package fr.dgtempo.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import fr.dgtempo.entity.Pointage;
import fr.dgtempo.repository.PointageRepository;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PointageService {
    // on inject le repo
    private final PointageRepository pointageRepository;

    @Transactional
    public Pointage enregistrerArrivee() {
        // on déclare la date du jour
        LocalDate dateDuJour = LocalDate.now();
        // on vérifie si un pointage existe déjà pour la date du jour
        if (pointageRepository.findByDate(dateDuJour).isPresent()) {
            throw new IllegalStateException("Un pointage existe déjà pour la date du jour.");
        }

        // on crée un nouveau pointage
        Pointage pointage = new Pointage();
        pointage.setDate(dateDuJour);
        pointage.setArrivee(LocalDateTime.now());

        // on enregistre le pointage dans la base de données
        return pointageRepository.save(pointage);

    }
}
