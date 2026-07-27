# Audit initial du portfolio/CV

Audit réalisé le 16 juillet 2026, avant la refonte du site public. Ce document décrit l'état observé dans l'espace de travail, y compris les modifications locales non validées dans Git.

## 1. Structure actuelle du dépôt

Le dépôt publié est volontairement plat :

- `index.html` : page publique unique, avec les versions française et anglaise présentes simultanément dans le DOM ;
- `styles.css` : styles écran, thème sombre, responsive et impression de la page publique ;
- `black.html` : redirection vers la page publique avec un paramètre de thème ;
- `cv-short*.md`, `cv-final*.md`, `cv-ats*.md`, `cv-pole-emploi.md` : plusieurs familles de sources Markdown ;
- `dist/` : rendus HTML/PDF générés, plus de nombreux rendus de candidatures ciblées dans l'espace de travail ;
- `scripts/render-cv.js` : transformateur Markdown vers HTML et PDF Chrome ;
- `cv-print.css` : mise en page A4 ;
- `heavents-recruiter-pack/` : documents et captures techniques publics ;
- `scripts/render-heavents-pack.js` : génération HTML de ce pack ;
- `assets/` et `profil-linkedin.jpeg` : visuels ;
- `robots.txt`, `llms.txt`, `README.md` : fichiers de publication et de documentation.

État Git au début de l'audit : 124 chemins modifiés ou non suivis, dont 15 fichiers suivis modifiés et 109 chemins non suivis. Les candidatures ciblées et leurs rendus sont considérés comme des données utilisateur à préserver. La refonte doit rester concentrée sur le socle public.

## 2. Technologies utilisées

- HTML, CSS et JavaScript natifs, sans framework front-end ;
- Node.js 20 pour les scripts de génération ;
- Chrome headless pour l'impression PDF ;
- Markdown comme format éditorial des CV et du pack Sonomundi ;
- GitHub Pages comme hébergement actuel ;
- polices Google Fonts chargées à distance ;
- aucune configuration de dépendances, commande de build globale ou suite de tests déclarée dans le dépôt.

Cette base est adaptée à une refonte légère et performante. Un framework applicatif serait disproportionné.

## 3. Sources de contenu

Le contenu est actuellement maintenu à plusieurs endroits :

1. `index.html`, qui contient manuellement deux CV presque complets ;
2. `cv-short.md` et `cv-short-en.md`, présentés par le README comme CV prioritaires ;
3. `cv-ats.md` et `cv-ats-en.md`, versions recruteur/ATS ;
4. `cv-final.md` et `cv-final-en.md`, très détaillés mais qualifiés de brouillons historiques dans le README ;
5. `cv-pole-emploi.md`, qui explicite la période post-Evina ;
6. les candidatures ciblées non suivies, parfois dérivées d'états différents du contenu ;
7. le pack recruteur Sonomundi et plusieurs documents LinkedIn/non publics.

Il n'existe pas de source structurée commune pour le nom, les coordonnées, les dates, les expériences, les liens ou les métriques. Le risque de dérive est déjà visible.

## 4. Pipeline de génération

`scripts/render-cv.js` :

- lit un Markdown ;
- applique un parseur Markdown interne limité ;
- produit `dist/<source>.html` ;
- lance Chrome headless pour produire un PDF ;
- dans les modifications locales présentes, ajoute au rendu le lien du CV complet et crée aussi un nom de PDF destiné au recruteur ;
- conserve un alias technique `dist/<source>.pdf`.

`scripts/render-heavents-pack.js` génère les documents HTML du pack Sonomundi.

Points faibles observés :

- aucune commande unique de build ;
- aucune validation HTML ou de liens ;
- aucune vérification automatisée des langues, dates ou faits clés ;
- la vérification d'absence de mention d'autorisation de travail n'est pas encore imposée par le script ;
- les PDF existants ne sont pas tous synchronisés avec la version locale du générateur ;
- le rendu dépend de polices distantes ;
- le README référence encore un ancien nom de dépôt (`Axxon/presentation`).

## 5. Incohérences détectées

| Sujet | Sources | Observation | Décision sûre pour la refonte |
| --- | --- | --- | --- |
| Evina | Sources officielles FR/EN, accueil, ATS, PDF | Début en juin 2022 et fin en juin 2024 partout dans le socle audité. Aucune contradiction trouvée. | Conserver juin 2022–juin 2024. |
| Début de Sonomundi | `cv-short*`, `cv-final*`, ATS, accueil, candidatures récentes | La majorité des sources détaillées et les preuves datées indiquent décembre 2025. | Utiliser décembre 2025 comme donnée la mieux documentée, sans prétendre couvrir toute la transition post-Evina. |
| Transition post-Evina | `cv-pole-emploi.md`, `cv-celad-laravel.md` | L’audit initial avait détecté des titres de période rattachant juillet 2024 à Sonomundi. | Corrigé le 20 juillet 2026 : transition commencée en juillet 2024, développement de Sonomundi commencé en décembre 2025. |
| Autre date Sonomundi | brouillon ciblé AudioWizard repéré par la recherche | Une formulation évoque un produit maintenu depuis 2024. | Ne pas reprendre cette date ; corriger la variante séparément après validation humaine. |
| Statut de Sonomundi | accueil et CV | Le produit est décrit comme préproduction Hostinger en amélioration continue et comme démo recruteur figée. Rien ne prouve une validation en production réelle. | Afficher explicitement « produit personnel / expérience non salariée », séparer terminé, en cours, expérimental et non validé en production réelle. |
| Accès à la démo Sonomundi | CV récents, `heavents-pack-entretien.md`, URL publique | Les CV récents donnent une URL recruteur qui répond en HTTP 200, tandis que l'ancien pack d'entretien indique encore « démo publique : non, uniquement locale ». | Lier la démo recruteur comme support figé actuellement accessible, sans la présenter comme un produit public mature ; validation humaine de sa pérennité requise. |
| Date des captures Sonomundi | `heavents-pack-entretien.md`, `heavents-recruiter-pack/captures/README.md` | Le pack mentionne des captures produites le 15 juin 2026 ; le README des captures indique le 27 juin 2026 pour les captures UI. | Ne pas attribuer une date unique à tout le pack ; conserver seulement les dates attachées explicitement aux tests et métriques. |
| Disponibilité | `index.html` | « Disponible à l'écoute » / « Open to opportunities » est affiché sans date ni autre source de confirmation. | Omettre la disponibilité du hero tant qu'elle n'est pas confirmée. La recherche d'un CDI senior reste documentée. |
| Période sans emploi salarié | `cv-pole-emploi.md` | Dernier emploi salarié terminé en juin 2024 ; transition à partir de juillet 2024 ; Sonomundi à partir de décembre 2025. | Présenter cette chronologie sans assimiler Sonomundi à un emploi. |
| Lien obligatoire du CV complet | sources Markdown et PDF | Aucune source Markdown officielle ne contient directement le lien. Le générateur local l'injecte, mais cinq des six PDF principaux audités ne l'affichent pas encore ; seul `cv-short.pdf` est à jour. | Ajouter/valider le lien dans le pipeline puis régénérer tous les PDF officiels. |
| Nommage des PDF | `dist/` | Aucun fichier existant ne commence encore par `Sébastien Grans - CV`, malgré la logique locale ajoutée au générateur. | Générer les fichiers recruteur correctement nommés tout en conservant les alias techniques. |

Aucune mention interdite d'autorisation de travail n'a été trouvée dans les sources actives hors texte des règles du projet. Les PDF principaux audités n'en contiennent pas non plus.

## 6. Liens potentiellement cassés ou non vérifiables

Les liens locaux de la page actuelle pointent vers des fichiers présents. Les contrôles HTTP ont donné :

- site actuel, démo Sonomundi, GitHub, Sapiendo, Norsys et Groupe Blachère : réponse 200 ;
- Evina : réponse 403 au contrôle automatisé, mais page accessible avec un navigateur ;
- SensioLabs : échec TLS avec `curl`, mais page accessible avec un navigateur ;
- LinkedIn : réponse 999, blocage classique des clients automatisés ; vérification manuelle requise.

Ces trois derniers cas sont donc « non vérifiables automatiquement », pas des liens déclarés cassés.

Risques de liens à traiter pendant la refonte :

- les liens de langue utilisent actuellement `?lang=fr` et `?lang=en` au lieu de routes séparées ;
- `black.html` dépend du même mécanisme par paramètre ;
- les futures routes imbriquées nécessiteront des chemins relatifs cohérents vers `dist/`, les images et les documents Sonomundi ;
- les URL canoniques et alternatives sont codées en dur sur le domaine GitHub Pages.

## 7. Duplications et densité de contenu

Mesures de référence de l'accueil actuel :

- 703 lignes HTML et 885 lignes CSS ;
- environ 2 011 mots visibles pour la seule version française et 1 873 pour l'anglaise ;
- 98 éléments de liste dans les deux versions ;
- 23 occurrences du mot Sonomundi dans le fichier ;
- Sonomundi est présenté deux fois par langue ;
- les deux langues sont présentes dans le DOM et seulement masquées par CSS ;
- la meta `keywords` est une longue accumulation de termes techniques ;
- les listes de compétences, expériences et outils IA répètent largement les sources Markdown.

L'accueil fonctionne comme un CV exhaustif, pas comme une page de conversion lisible en 30 secondes.

## 8. Accessibilité, SEO et performance

### Accessibilité

Points positifs : HTML globalement sémantique, liens de contact explicites, focus visible sur plusieurs contrôles, responsive existant.

Écarts majeurs : absence de lien d'évitement, deux langues dans le DOM principal, contrôle flottant partiellement masqué, aucune validation axe, image animée permanente, attributs de dimensions manquants, navigation et ordre de lecture mobile à revoir, pas de traitement de `prefers-reduced-motion`.

### SEO

Manquent ou sont insuffisants : canonical, Open Graph, Twitter Cards, données structurées `Person`, sitemap, favicon réel, titres/descriptions par route, routes linguistiques, `hreflang` cohérent et image sociale explicite. `robots.txt` ne référence aucun sitemap. La meta `keywords` doit être supprimée.

### Performance

Risques principaux : Google Fonts bloquantes, GIF de 280 Ko, image sans dimensions explicites, CSS très lié à l'ancien CV, JavaScript de langue/thème plus complexe que nécessaire. Les captures de l'étude de cas vont jusqu'à 2,3 Mo et devront être chargées paresseusement avec dimensions.

## 9. Risques de régression

- écraser les nombreuses modifications locales et candidatures non suivies ;
- supprimer ou renommer les alias PDF déjà utilisés ;
- casser les chemins relatifs depuis les routes `/fr/` et `/en/` ;
- dégrader le rendu A4 ou l'extraction ATS ;
- propager une date Sonomundi contradictoire ;
- présenter une métrique ou un statut de production comme vérifié alors qu'il ne l'est pas ;
- casser GitHub Pages en introduisant un build non exécuté avant publication ;
- rendre les URL canoniques incompatibles avec un futur domaine personnalisé.

## 10. Plan de modification

1. Créer une source JSON commune pour l'identité, les coordonnées, les dates, les expériences, les compétences, les preuves et le contenu bilingue du site.
2. Ajouter un générateur statique léger et une configuration d'URL de base surchargeable pour GitHub Pages ou un domaine personnalisé.
3. Conserver `/` comme redirection/choix de langue accessible et créer `/fr/` et `/en/`, chacun avec une seule langue dans le DOM.
4. Générer pour chaque langue un accueil court, un CV détaillé et une étude de cas Sonomundi.
5. Réduire l'accueil à un hero, quatre groupes de compétences, trois preuves, une expérience condensée, une seule section Sonomundi et le contact.
6. Déplacer les détails, technologies secondaires, métriques de volume et outils IA vers le CV détaillé ou l'étude de cas.
7. Ajouter navigation clavier, lien d'évitement, focus, contrastes, dimensions d'images, chargement différé et réduction de mouvement.
8. Ajouter titres/descriptions uniques, canonical configurable, `hreflang`, Open Graph, Twitter Cards, `Person`, favicon, sitemap et robots.
9. Renforcer `render-cv.js` : interdiction de travail explicite, lien obligatoire, noms recruteur et conservation des alias ; régénérer les six CV principaux.
10. Ajouter des contrôles locaux pour les routes, liens, langues, faits essentiels, PDF et HTML ; exécuter Lighthouse/axe si les outils peuvent être installés ou sont disponibles.
11. Réécrire le README avec build, génération, tests, accessibilité, SEO, déploiement et domaine personnalisé.
12. Relire et corriger le résultat selon les cinq profils demandés avant livraison.
