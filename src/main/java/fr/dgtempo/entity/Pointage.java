package fr.dgtempo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "pointages")
@Getter
@Setter
@NoArgsConstructor
public class Pointage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    private LocalDateTime arrivee;

    private LocalDateTime pause;

    private LocalDateTime reprise;

    private LocalDateTime depart;

}
