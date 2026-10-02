# DGtempo Front

Interface utilisateur DGtempo, construite avec React 19, TypeScript, Vite 8 et Tailwind CSS 4. La documentation détaillée se trouve dans le [site Docusaurus](../docs-site/docs/index.md).

## Prérequis et lancement

Installer une version de Node.js compatible avec Vite 8, puis lancer depuis ce dossier :

```bash
npm install
npm run dev
```

Vite affiche l’adresse locale, habituellement `http://localhost:5173`. En développement, `vite.config.ts` redirige les chemins `/api` vers `http://localhost:8080`; il faut donc démarrer le back séparément. Les autres commandes disponibles sont `npm run build` (TypeScript puis bundle) et `npm run preview`.

## Pages et navigation

- `/login` : connexion, validation des champs et bascule d’affichage du mot de passe.
- `/signup` : création d’un utilisateur.
- `/home` : accueil et accès rapide aux fonctions.
- `/pointage` : état quotidien, temps travaillé et action suivante.
- `/historique` : sélection d’un mois, tableau des pointages et pagination de cinq lignes.
- `/profil` : informations du compte en lecture seule.

Les quatre dernières pages sont regroupées sous `DashboardLayout`. Au chargement, ce layout récupère l’utilisateur via `GET /api/auth/me` et redirige vers la connexion en cas d’échec.

## Organisation du code

- `src/App.tsx` : routes React Router.
- `src/components/` : pages et éléments d’interface, avec sous-dossier `dashboard/` pour l’espace connecté.
- `src/services/` : appels métier regroupés par ressource (`auth`, `users`, `pointages`).
- `src/lib/api.ts` : client Axios partagé, configuration des cookies et extraction des messages d’erreur.
- `src/types/` : types des objets échangés avec l’API.
- `src/assets/` et `public/` : ressources graphiques.
- `src/styles.css` / `src/index.css` : imports Tailwind et styles globaux.

Les appels API utilisent des chemins relatifs `/api/...` et Axios avec `withCredentials: true`, pour transmettre le cookie de session. Les calculs d’affichage du temps travaillé sont dans `components/dashboard/pointage-utils.ts` ; le back reste la source des horodatages enregistrés.

## Technologies principales

- React et React Router pour l’interface et la navigation.
- TypeScript pour les types.
- Vite pour le serveur de développement et le build.
- Tailwind CSS, Base UI, React Day Picker et Lucide pour les composants/styles.
- React Hook Form pour les formulaires et Axios pour les requêtes HTTP.

L’alias `@/` cible `src/`. Il est configuré dans `vite.config.ts` et dans les configurations TypeScript.
