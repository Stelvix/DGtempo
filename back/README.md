# DGtempo Back

API REST de DGtempo, construite avec Java 21 et Spring Boot. La documentation détaillée se trouve dans le [site Docusaurus](../docs-site/docs/index.md), notamment la [référence API](../docs-site/docs/api.md).

## Prérequis et lancement

Java 21 est requis. Le dépôt inclut Maven Wrapper :

```bash
./mvnw spring-boot:run
```

Sous Windows :

```powershell
./mvnw.cmd spring-boot:run
```

L’API écoute par défaut sur `http://localhost:8080`. L’interface Vite redirige ses requêtes `/api` vers ce serveur.

## Organisation du code

- `controller/` : routes REST pour les comptes, l’authentification et les pointages.
- `services/` : règles métier, validation des identifiants et transactions.
- `repository/` : repositories Spring Data JPA.
- `entity/` : modèle persistant `Users` et `Pointage`.
- `dto/` : objets de réponse exposés par l’API.
- `config/PasswordConfig.java` : encodeur BCrypt.
- `exception/GlobalExceptionHandler.java` : réponses pour les conflits métier.
- `src/main/resources/application.properties` : configuration H2/JPA.

## Session et persistance

La connexion crée une session HTTP et y place l’identifiant utilisateur sous `authenticatedUserId`. `/api/auth/me` et les routes de pointage lisent cet identifiant ; la déconnexion invalide la session. Les mots de passe sont stockés sous forme BCrypt. Chaque pointage est associé à un utilisateur et une date, avec une contrainte d’unicité sur cette paire.

La base de développement est H2 fichier (`./data/dgtempo`) et la console H2 est activée sur `/h2-console`. Ces réglages sont définis dans `application.properties`. Pour la compilation : `./mvnw package`; pour exécuter les tests présents : `./mvnw test`.

## API

Les routes disponibles sont :

- `POST /api/users` : création publique d’un compte.
- `POST /api/auth/login`, `GET /api/auth/me`, `POST /api/auth/logout` : session utilisateur.
- `GET /api/pointages/du-jour`, `GET /api/pointages/historique` : lecture des pointages du compte connecté.
- `POST /api/pointages/arrivee`, `/pause`, `/reprise` et `/depart` : enregistrer les événements de la journée.

Les corps attendus, formats de réponse, validations et statuts HTTP sont détaillés dans la [référence API du site](../docs-site/docs/api.md).
