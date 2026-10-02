package fr.dgtempo.repository;

import fr.dgtempo.entity.Pointage;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PointageRepository extends JpaRepository<Pointage, Long> {

    Optional<Pointage> findByDate(LocalDate date);

    // recuperer un pointage en fonction de l'utilisateur
    Optional<Pointage> findPointageByDateAndUserId(LocalDate date, Long userId);

    List<Pointage> findAllByUserIdOrderByDateDesc(Long userId);

}
