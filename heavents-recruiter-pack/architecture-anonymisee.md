# Architecture anonymisée Sonomundi

Cette page résume l'architecture du projet. Elle ne contient ni secret, ni procédure d'exploitation, ni commande de lancement.

## Vue d'ensemble

Sonomundi est un side project personnel de long terme construit autour d'un monorepo Laravel/Vue pour explorer un produit événementiel/musical :

- découverte d'événements;
- navigation event/artist/track;
- auth multi-rôles;
- surfaces publiques/authentifiées/admin;
- tests et validation du parcours démo.

## Composants principaux

| Couche | Rôle |
| --- | --- |
| Laravel / PHP | API REST, auth, rôles, ressources métier, jobs |
| Vue 3 / TypeScript | SPA, navigation, hub events, surfaces utilisateur |
| MySQL | données applicatives principales |
| Redis | cache, queues, coordination locale |
| Neo4j | expérimentation graphe/recommandation |
| Playwright / PHPUnit | validations backend, UI et accès par rôle |
| OpenAPI/Scramble | contrats API documentés |
| Docker/k3s local | environnement de démo et validation locale |

## Parcours montré

1. Hub `/events`.
2. Région sélectionnée avec événements visibles.
3. Ouverture event, artist et track.

Les surfaces publiques/authentifiées/admin font partie du périmètre produit. Le parcours court privilégie la découverte et la navigation event/artist/track pour garder une lecture claire du domaine.

## Workflow IA

L'IA a été utilisée comme accélérateur de delivery, pas comme remplacement de responsabilité technique :

- Codex pour implémentation, analyse et documentation;
- Codex Skills et MCP pour outiller des workflows contextualisés;
- Paperclip pour structurer des lanes d'agents;
- LangChain/LangGraph pour audits et readiness;
- worktrees isolés pour séparer les chantiers;
- validation Docker/tests;
- auto-review des pull requests et documentation de validation avant décision d'intégration.

## Limites de présentation

- Le projet est présenté comme un side project Laravel/Vue destiné à une sortie progressive, sans calendrier pressant.
- Son développement reste hors temps de travail, peut être mis en pause et n'affecte pas la disponibilité complète pour un employeur.
- Les zones billing, wallet, settlement, monétisation et surfaces avancées restent des chantiers distincts.
- Les secrets, credentials et détails d'exploitation ne sont pas partagés.
- La démonstration se fait en partage d'écran; le lecteur n'a pas à exécuter le projet.
