package fr.dgtempo.services;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.stereotype.Service;
import fr.dgtempo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import fr.dgtempo.entity.Users;


@Service 
@RequiredArgsConstructor 
public class UserService {
private final UserRepository userRepository;

    public Users findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Users findByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    // méthode pour enregistrer un nouvel utilisateur
    @Transactional 
    public Users enregistrerUtilisateur(Users utilisateur) {
        // on vérifie si le nom d'utilisateur ou l'email existe déjà
        if (userRepository.findByUsername(utilisateur.getUsername()) != null) { 
            throw new IllegalStateException("Le nom d'utilisateur existe déjà.");
        }
        if (userRepository.findByEmail(utilisateur.getEmail()) != null) {
            throw new IllegalStateException("L'email existe déjà.");
        }
        return userRepository.save(utilisateur);
    }   


    // méthode pour récupérer un utilisateur par son ID
    @Transactional 
    public Users recupererUtilisateurParId(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Utilisateur non trouvé avec l'ID : " + id));
    }


    // méthode pour mettre à jour un utilisateur existant
    @Transactional
    public Users mettreAJourUtilisateur(Long id, Users utilisateur) {
        Users utilisateurExistant = userRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Utilisateur non trouvé avec l'ID : " + id));
        utilisateurExistant.setUsername(utilisateur.getUsername());
        utilisateurExistant.setEmail(utilisateur.getEmail());
        utilisateurExistant.setPassword(utilisateur.getPassword());
        utilisateurExistant.setRole(utilisateur.getRole());
        return userRepository.save(utilisateurExistant);
    }


    // méthode pour supprimer un utilisateur par son ID
    @Transactional
    public void supprimerUtilisateur(Long id) {
        userRepository.deleteById(id);
    }

}
