package fr.dgtempo.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import fr.dgtempo.entity.Pointage;
import fr.dgtempo.entity.Users;
import fr.dgtempo.repository.PointageRepository;
import lombok.RequiredArgsConstructor;
import fr.dgtempo.repository.UserRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PointageService {
    // on inject le repo
    private final PointageRepository pointageRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public Optional<Pointage> recupererPointageDuJour(Long userId) {
        return pointageRepository.findPointageByDateAndUserId(LocalDate.now(), userId);
    }

    @Transactional(readOnly = true)
    public List<Pointage> recupererHistorique(Long userId) {
        return pointageRepository.findAllByUserIdOrderByDateDesc(userId);
    }

    // méthode pour enregistrer l'arrivée d'un employé
    @Transactional
    public Pointage enregistrerArrivee(Long userId) {
        // on déclare la date du jour et on récupère l'utilisateur
        LocalDate dateDuJour = LocalDate.now();
        Users utilisateur = recupererUtilisateur(userId);

        // on vérifie si un pointage existe déjà pour cet utilisateur aujourd'hui
        if (pointageRepository.findPointageByDateAndUserId(dateDuJour, userId).isPresent()) {
            throw new IllegalStateException("Un pointage existe déjà pour cet utilisateur à la date du jour.");
        }

        // on crée un nouveau pointage
        Pointage pointage = new Pointage();
        pointage.setDate(dateDuJour);
        pointage.setUser(utilisateur);
        pointage.setArrivee(LocalDateTime.now());

        // on enregistre le pointage dans la base de données
        return pointageRepository.save(pointage);

    }

    // méthode pour enregistrer la pause d'un employé
    @Transactional
    public Pointage enregistrerPause(Long userId) {
        // on déclare la date du jour
        LocalDate dateDuJour = LocalDate.now();

        // on récupère le pointage du jour
        Pointage pointage = pointageRepository.findPointageByDateAndUserId(dateDuJour, userId)
                .orElseThrow(() -> new IllegalStateException("Aucun pointage trouvé pour la date du jour."));

        // on enregistre la pause dans le pointage
        pointage.setPause(LocalDateTime.now());

        // on met à jour le pointage dans la base de données
        return pointageRepository.save(pointage);
    }

    // méthode pour enregistrer le retour de pause d'un employé
    @Transactional
    public Pointage enregistrerReprise(Long userId) {
        // on déclare la date du jour
        LocalDate dateDuJour = LocalDate.now();
        // on récupère le pointage du jour
        Pointage pointage = pointageRepository.findPointageByDateAndUserId(dateDuJour, userId)
                .orElseThrow(() -> new IllegalStateException("Aucun pointage trouvé pour la date du jour."));
        // on enregistre le retour de pause dans le pointage
        pointage.setReprise(LocalDateTime.now());
        // on met à jour le pointage dans la base de données
        return pointageRepository.save(pointage);
    }

    // méthode pour enregistrer le départ d'un employé
    @Transactional
    public Pointage enregistrerDepart(Long userId) {
        // on déclare la date du jour
        LocalDate dateDuJour = LocalDate.now();
        // on récupère le pointage du jour
        Pointage pointage = pointageRepository.findPointageByDateAndUserId(dateDuJour, userId)
                .orElseThrow(() -> new IllegalStateException("Aucun pointage trouvé pour la date du jour."));
        // on enregistre le départ dans le pointage
        pointage.setDepart(LocalDateTime.now());
        // on met à jour le pointage dans la base de données
        return pointageRepository.save(pointage);
    }

    // Méthode spéciale pour modifier un pointage existant en fonction de
    // l'utilisateur au cas où l'employé aurait oublié de pointer
    @Transactional
    public Pointage modifierPointageByUser(Long id, Pointage pointage, String email) {
        // on récupère le pointage existant
        Pointage pointageExistant = pointageRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Pointage non trouvé avec l'ID : " + id));

        // on récupère l'utilisateur
        var utilisateur = userRepository.findByEmail(email);
        if (utilisateur == null) {
            throw new IllegalStateException("Utilisateur non trouvé avec l'email : " + email);
        }

        if (pointageExistant.getUser() == null || !pointageExistant.getUser().getId().equals(utilisateur.getId())) {
            throw new IllegalStateException("Ce pointage n'appartient pas à l'utilisateur indiqué.");
        }

        // on met à jour les champs du pointage existant
        pointageExistant.setArrivee(pointage.getArrivee());
        pointageExistant.setPause(pointage.getPause());
        pointageExistant.setReprise(pointage.getReprise());
        pointageExistant.setDepart(pointage.getDepart());
        // on met à jour le pointage dans la base de données
        return pointageRepository.save(pointageExistant);
    }

    private Users recupererUtilisateur(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("Utilisateur non trouvé avec l'ID : " + userId));
    }
}
