package fr.dgtempo.dto;

import fr.dgtempo.entity.Pointage;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record PointageResponse(
        LocalDate date,
        LocalDateTime arrivee,
        LocalDateTime pause,
        LocalDateTime reprise,
        LocalDateTime depart) {

    public static PointageResponse from(Pointage pointage) {
        return new PointageResponse(
                pointage.getDate(),
                pointage.getArrivee(),
                pointage.getPause(),
                pointage.getReprise(),
                pointage.getDepart());
    }

    public static PointageResponse empty(LocalDate date) {
        return new PointageResponse(date, null, null, null, null);
    }
}