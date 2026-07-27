# Questions techniques fréquentes

## "Quelle volumétrie représente Sonomundi ?"

Le noyau produit a été mesuré le 8 juillet 2026 avec `cloc 2.09` sur la branche `docs/preprod-v046-verification-20260708` : `274 225` lignes de code applicatif sur `1 589` fichiers, hors tests, docs et dépendances, dont `136 791` lignes PHP, `102 986` lignes Vue et `29 366` lignes TypeScript. Les tests produit représentaient `130 623` lignes sur `813` fichiers. Au 16 juillet 2026, le projet compte `3 320` commits sur `main`. Ces volumes restent des métriques secondaires : la maintenabilité s'évalue avec les frontières de modules, les tests, les migrations, les contrats API, la documentation et la capacité à isoler un changement.

## "Quelle part est générée par IA ?"

Le projet assume une assistance IA importante, sans pourcentage fiable à annoncer. Les changements passent par des branches et worktrees isolés, des tests Docker/CI, des processus d'auto-review des pull requests et une documentation structurée qui simplifie leur contrôle. Il n'y a pas d'auto-merge : je reste responsable du cadrage, de l'architecture, des arbitrages et de la décision d'intégration. Je présente Sonomundi comme un side project Laravel/Vue de long terme, pas comme du code accepté sans vérification.

## "Comment valides-tu le code ?"

Par couches : tests backend PHPUnit, tests UI Playwright, matrices d'accès par rôle, OpenAPI/Scramble pour les contrats, auto-review des pull requests, documentation de validation et contrôle du parcours de démonstration. L'inventaire statique de `main` au 16 juillet 2026 compte `2 189` tests PHPUnit déclarés dans `401` fichiers PHP (`1 687` méthodes `test*` et `502` méthodes `#[Test]`). Ce nombre décrit la codebase et non un run complet réussi ; les jeux de données peuvent aussi modifier le nombre de cas exécutés. Côté fonctionnel, la matrice Playwright documentée affiche `683 passed / 0 failed` sur les rôles unlogged, public, artist, label et admin. Pour une tâche donnée, je cherche la validation la plus ciblée possible, puis j'élargis si le changement touche un contrat partagé.

## "Qu'est-ce qui prouve que le projet est structuré ?"

Il y a des migrations, resources API, middlewares de rôle, jobs, tests, documentation d'architecture, OpenAPI et cartographie d'accès. Ce sont des marqueurs d'un produit structuré. Certaines surfaces restent gelées ou partielles.

## "Que referais-tu si tu devais industrialiser le projet ?"

Je figerais un MVP plus petit, je supprimerais les chantiers hors trajectoire, je séparerais mieux les services qui méritent une ownership distincte, je renforcerais CI/CD, secrets management, observabilité, sauvegardes, monitoring et données de démo. Je traiterais aussi les flux économiques et audio réel comme chantiers dédiés avec tests de non-régression plus stricts.

## "Comment éviter l'effet boîte noire des agents IA ?"

Par des specs explicites, des worktrees séparés, des scopes autorisés, des validations imposées, des processus d'auto-review des pull requests et une documentation de handoff courte. Un agent produit une proposition, un diff ou une analyse ; il n'a pas d'autorité de merge. La source de vérité reste le dépôt, les tests, les contrats documentés et la décision d'intégration dont je suis responsable.

## "Ce side project risque-t-il d'empiéter sur un emploi ?"

Non. Sonomundi est un projet personnel de long terme, développé hors temps de travail et sans calendrier de lancement pressant. Il peut être mis en pause ; je reste complètement disponible pour mon employeur. Mon objectif est d'automatiser au maximum les tests, revues de PR, mises à jour documentaires, déploiements et alertes de suivi afin de limiter la maintenance et les interruptions.

## "Qu'est-ce qui est démontrable et qu'est-ce qui ne l'est pas ?"

Démontrable en partage d'écran : `/events`, région sélectionnée, ouverture event/artist/track, OpenAPI, diagramme anonymisé et résultats de tests. Le produit couvre aussi l'auth multi-rôles, des surfaces publiques/authentifiées/admin, des contrats API et des workers. Le lecteur n'a rien à lancer. Paiement/tokens/settlement, industrialisation infra, observabilité production mature, agents IA autonomes et surfaces admin ouvertes à des externes restent des chantiers distincts.

## "Pourquoi commencer par ce parcours alors qu'il y a plus de fonctionnalités ?"

Parce qu'il donne une lecture rapide du cœur produit : découverte d'événements et navigation event/artist/track. Les autres zones peuvent ensuite être détaillées selon le niveau de lecture : rôles, surfaces publiques/authentifiées/admin, workers, contrats API, tests et workflow IA.

## Angle de conclusion

La synthèse à retenir : "J'utilise l'IA pour accélérer un side project de long terme, avec auto-review des pull requests, tests et documentation de validation. Je garde la responsabilité du cadre, des invariants et de la décision d'intégration." C'est le point central du workflow Sonomundi.

Cette page sert de support de présentation. Elle complète la démonstration locale du projet.
