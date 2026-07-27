# Pack entretien Sonomundi

Objectif : préparer un support court pour défendre Sonomundi en entretien technique sans sur-vendre le projet comme produit fini.

Ce fichier sert d'index côté CV. Le contenu détaillé produit dans le projet Sonomundi est importé dans `heavents-recruiter-pack/`.

## Documents importés depuis Sonomundi

- `heavents-recruiter-pack/README-demo.md` : déroulé de démo conduite par moi en partage d'écran, parcours 5 et 15 minutes, limites assumées.
- `heavents-recruiter-pack/architecture-anonymisee.md` : architecture technique, frontières publiques/privées et invariants de sécurité sans secrets ni commandes d'exploitation.
- `heavents-recruiter-pack/captures-a-produire.md` : liste des captures fonctionnelles et techniques à produire avant entretien.
- `heavents-recruiter-pack/synthese-technique.md` : synthèse utilisable pour expliquer le projet à un recruteur ou lead développeur.
- `heavents-recruiter-pack/reponses-objections-lead-dev.md` : réponses préparées aux objections sur IA, maintenabilité, volume de code, validation et périmètre réel.
- `heavents-recruiter-pack/surface-fonctionnelle-hors-demo.md` : cartographie des surfaces existantes hors parcours de démo court.
- `heavents-recruiter-pack/captures/` : preuves de tests et captures UI pour support recruteur/lead dev.

## Message principal

Sonomundi est un side project personnel de long terme appliqué à un produit web événementiel/musical. L'objectif est de prendre le temps d'aboutir le produit puis de le publier progressivement, sans calendrier de lancement pressant. Le projet sert aussi à démontrer une capacité de cadrage, d'architecture, d'automatisation, d'intégration, de tests et de documentation sur un périmètre Laravel/Vue réaliste.

La formulation à défendre : le volume de code n'est pas le signal principal. Le signal principal est la capacité à cadrer, intégrer, tester, documenter et expliquer un produit web complexe, avec des processus d'auto-review et de validation reproductibles.

## Compatibilité avec un emploi à temps plein

Sonomundi reste développé hors temps de travail et peut être mis en pause. Il n'empiète pas sur ma disponibilité complète pour un employeur. L'automatisation des tests, revues de PR, mises à jour documentaires, déploiements et alertes de suivi vise précisément à réduire la maintenance courante et les interruptions.

## Statut à annoncer

- Démo recruteur dédiée : oui, via `https://demo.electronic.sonomundi.com/`, sur une version arrêtée ; ce n'est pas un SaaS public mature.
- Démo entretien : oui, conduite par moi en partage d'écran sur la version recruteur.
- Repo : privé.
- Projet : side project personnel démontrable, pas SaaS public terminé ; sortie progressive lorsque le produit sera suffisamment abouti.
- Rôle : pilotage technique du workflow IA, avec cadrage, architecture, découpage, orchestration d'agents, auto-review des pull requests, documentation de validation, arbitrages et intégration finale.
- Inventaire PHPUnit annoncé : comptage statique de `main` au 16 juillet 2026, `2 189` tests déclarés dans `401` fichiers PHP du monorepo (`1 687` méthodes `test*` et `502` méthodes `#[Test]`). Ce n'est pas présenté comme un run complet réussi.
- Historique Git annoncé : `3 320` commits sur `main` au 16 juillet 2026, à présenter comme contexte secondaire et non comme preuve de qualité.
- Stack IA à citer : Codex, Paperclip, LangChain/LangGraph.

## Preuves importées

- Captures du hub `/events`, région sélectionnée, event, artist, track, OpenAPI/Scramble et architecture anonymisée.
- Feedback et surfaces admin : à réserver aux questions lead dev/MVP, pas au parcours recruteur court.
- Inventaire statique du 16 juillet 2026 : `2 189` tests PHPUnit déclarés dans `401` fichiers PHP ; la preuve d'exécution ciblée reste distincte de ce total de codebase.
- Captures UI régénérées sans Vue/Vite DevTools visible.
- README démo court avec commandes de lancement.
- Liste des limites assumées : pas de démo publique permanente, streaming/audio partiel, recommandation avancée partielle, claims et surfaces avancées partiels.
- Cartographie des surfaces hors démo courte pour entretien lead dev.

La liste opérationnelle complète est dans `heavents-recruiter-pack/captures-a-produire.md`.

## Démo 5 minutes

1. Ouverture du hub `/events`.
2. Sélection d'une région et lecture des clusters/événements.
3. Consultation d'un event.
4. Ouverture d'un artist puis d'un track.
5. Explication courte des preuves disponibles : OpenAPI, architecture anonymisée, tests et limites.

## Démo 15 minutes

1. Reprise du parcours court `/events` -> event -> artist -> track.
2. Séparation des rôles et accès protégés.
3. OpenAPI/Scramble et architecture anonymisée.
4. Tests PHPUnit/Playwright et capture du run récent.
5. Limites assumées : pré-production contrôlée, repo privé, pas de promesse SaaS commercial mature.
6. Workflow IA encadré : cadrage, agents, validation Docker/CI, auto-review des pull requests et documentation de validation.

Le déroulé détaillé et les commandes sont dans `heavents-recruiter-pack/README-demo.md`.

## Réponse courte sur le volume de code

Le volume d'environ 540k lignes vient du périmètre métier volontairement dense et de l'objectif d'explorer rapidement un MVP avec IA. Je ne présente pas ce volume comme une fin en soi : la preuve importante est que le projet est structuré, testable, documenté, lançable localement et auditable.

## Réponse courte sur l'IA

Le code a été produit dans un workflow IA encadré. Mon rôle n'était pas d'être simple exécutant de code généré, mais responsable du cadre : cadrage, architecture, découpage, orchestration d'agents, arbitrages, sécurité et décision d'intégration. Les garde-fous sont Docker, tests, worktrees isolés, non-auto-merge, auto-review des pull requests et documentation structurée pour rendre les changements faciles à contrôler.

## À ne pas montrer

- Secrets et fichiers `.env`.
- Credentials bruts.
- Billing, wallet, tokens audio ou monétisation incomplète.
- Rails expérimentaux non stabilisés.
- Anciens workflows cloud/VPS payants non actifs.

Les éléments à ne pas exposer sont détaillés dans `heavents-recruiter-pack/architecture-anonymisee.md` et `heavents-recruiter-pack/captures-a-produire.md`.

## Score d'effet attendu

Sans pack : le projet est crédible mais questionne la maintenabilité et le périmètre réel.

Avec pack complet, captures récentes et run PHPUnit vérifiable : le projet devient une preuve technique contrôlée et peut faire monter le CV court autour de 92/100 selon le poste.
