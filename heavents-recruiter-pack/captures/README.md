# Captures Sonomundi

Date de production des captures UI: 2026-06-27.

Ces captures servent de support de présentation technique pour Sonomundi, side project personnel Laravel/Vue de long terme.

Les captures UI ont ete regenerees avec Vue/Vite DevTools masque.

## Fichiers

| Fichier | Usage | Diffusion |
| --- | --- | --- |
| `01-events-hub.png` | Hub `/events` | Présentation projet |
| `01b-events-region-selected.png` | Region selectionnee dans `/events` | Présentation projet |
| `02-event-open.png` | Detail event depuis `/events` | Présentation projet |
| `03-artist-open.png` | Detail artist depuis `/events` | Présentation projet |
| `04-track-open.png` | Detail track depuis `/events` | Présentation projet |
| `08-phpunit-current-run.png` | Preuve visuelle du run PHPUnit courant | Présentation technique |
| `10-architecture-anonymisee.png` | Diagramme architecture anonymise | Présentation technique |
| `11-stack-ia-produit-cicd.png` | Version statique accessible de l’infographie workflow IA / produit | Étude de cas Sonomundi |
| `11-stack-ia-produit-cicd.gif` | Version animée proposée uniquement sur action de l’utilisateur | Diffusion secondaire |

## Commandes de generation

```bash
make testctx-ui-single TEST_DOCKER_CONTEXT=test UI_FIXTURES_PROFILE=full UI_REAL_AUTH_SESSION=1 UI_TESTS='tests/ui/routes/cross-role/recruiter-pack-captures.feature.spec.ts --workers=1' UI_TEST_OUTPUT_DIR=event-feed-front/.playwright/recruiter-pack-run
make testctx-test TEST_DOCKER_CONTEXT=test LOGS=0 LOCK_WATCH=0 TEST_KEEP_STACK=0 TEST_ARGS_EXTRA='--order-by=default'
```

Resultats retenus:

- Captures UI/documentation disponibles dans ce dossier.
- Infographie workflow IA/produit ajoutée le 2026-07-16 ; la page affiche le PNG statique et propose séparément le GIF animé de 6,1 secondes en boucle.
- Inventaire statique de `main` au 2026-07-16 : `2 189` tests PHPUnit déclarés dans `401` fichiers PHP du monorepo (`1 687` méthodes `test*` et `502` méthodes `#[Test]`). Ce comptage ne constitue pas un run complet réussi.
- Historique Git au 2026-07-16 : `3 320` commits sur `main`, métrique de contexte et non preuve de qualité.

## Publication

- Ne pas publier les logs bruts, traces Playwright internes, listings de processus ou variables d'environnement.
- Verifier visuellement les captures avant envoi externe, notamment les comptes de demo, references publiques et URLs locales visibles.
- Verifier que Vue/Vite DevTools et les overlays de developpement ne sont pas visibles.
- Les PNG ont ete nettoyes de leurs chunks auxiliaires de metadonnees; le scan `strings` ne remonte pas de motif secret, URL locale ou email.
