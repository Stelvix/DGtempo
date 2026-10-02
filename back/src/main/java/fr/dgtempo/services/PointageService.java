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

    // méthode pour enregistrer l'arrivée d'un employé
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

    // méthode pour enregistrer la pause d'un employé
    @Transactional
    public Pointage enregistrerPause() {
        // on déclare la date du jour
        LocalDate dateDuJour = LocalDate.now();
        // on récupère le pointage du jour
        Pointage pointage = pointageRepository.findByDate(dateDuJour)
                .orElseThrow(() -> new IllegalStateException("Aucun pointage trouvé pour la date du jour."));
        // on enregistre la pause dans le pointage
        pointage.setPause(LocalDateTime.now());
        // on met à jour le pointage dans la base de données
        return pointageRepository.save(pointage);
    }

    // méthode pour enregistrer le retour de pause d'un employé
    @Transactional
    public Pointage enregistrerReprise() {
        // on déclare la date du jour
        LocalDate dateDuJour = LocalDate.now();
        // on récupère le pointage du jour
        Pointage pointage = pointageRepository.findByDate(dateDuJour)
                .orElseThrow(() -> new IllegalStateException("Aucun pointage trouvé pour la date du jour."));
        // on enregistre le retour de pause dans le pointage
        pointage.setReprise(LocalDateTime.now());
        // on met à jour le pointage dans la base de données
        return pointageRepository.save(pointage);
    }   

    // méthode pour enregistrer le départ d'un employé
    @Transactional
    public Pointage enregistrerDepart() {
        // on déclare la date du jour   
        LocalDate dateDuJour = LocalDate.now();
        // on récupère le pointage du jour
        Pointage pointage = pointageRepository.findByDate(dateDuJour)
                .orElseThrow(() -> new IllegalStateException("Aucun pointage trouvé pour la date du jour."));
        // on enregistre le départ dans le pointage
        pointage.setDepart(LocalDateTime.now());
        // on met à jour le pointage dans la base de données
        return pointageRepository.save(pointage);
    }
}
