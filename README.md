# Portfolio et CV — Sébastien Grans

Site bilingue et documents de candidature de Sébastien Grans, Senior Software Engineer spécialisé dans le développement agentique maîtrisé, l’architecture logicielle et le delivery AI-native.

Le site public est conçu pour donner à un recruteur, en moins de 30 secondes, le positionnement recherché, la proposition de valeur, trois preuves, le CV à télécharger et un moyen de contact. Le CV détaillé et l’étude de cas Sonomundi gardent le niveau d’information utile à un lead développeur.

L’[audit initial](docs/audit-initial.md) décrit l’état du dépôt avant la refonte. Le [rapport final](docs/rapport-final.md) regroupe les décisions, fichiers et résultats de tests.

## Architecture

Le projet reste volontairement statique et sans framework front-end :

- `data/profile.json` : source structurée commune pour l’identité, les dates de référence, les expériences, les compétences, les preuves, les métriques et le contenu bilingue ;
- `scripts/build-site.js` : génération des pages, du sitemap, de `robots.txt` et de `llms.txt` ;
- `styles.css` : styles partagés, responsive, focus clavier et impression ;
- `fr/` et `en/` : pages générées, avec une seule langue dans le contenu principal ;
- `scripts/render-cv.js` : génération HTML/PDF depuis les CV Markdown ;
- `cv-print.css` : rendu A4 des CV ;
- `dist/` : HTML/PDF générés et alias de compatibilité ;
- `heavents-recruiter-pack/` : documents et captures techniques publics de l’étude de cas ;
- `scripts/check-site.js` : contrôles des routes, liens locaux, langues, SEO et règles de contenu ;
- `scripts/serve.js` : serveur local sans dépendance.

## Routes publiques

| Français | English |
| --- | --- |
| `/fr/` — accueil | `/en/` — home |
| `/fr/cv/` — CV détaillé | `/en/cv/` — detailed resume |
| `/fr/sonomundi/` — étude de cas | `/en/sonomundi/` — case study |

La racine `/` redirige vers `/fr/`. Les changements de langue sont de vrais liens : aucune seconde langue n’est masquée avec CSS ou JavaScript.

## Prérequis

- Node.js 20 ou plus récent ;
- Google Chrome ou Chromium pour générer les PDF ;
- `pdfinfo` et `pdftotext` pour les contrôles PDF recommandés.

Aucune dépendance d’exécution n’est nécessaire pour construire ou servir le site.

Installer la dépendance de test navigateur avec :

```bash
npm ci
```

## Commandes principales

```bash
npm run build
npm run check
npm run check:pdf
npm test
npm run serve
```

Le serveur local écoute par défaut sur `http://127.0.0.1:4173/fr/`.

Variables facultatives :

```bash
PORT=8080 npm run serve
SITE_URL=https://cv.example.com npm run build
```

`SITE_URL` alimente les URL canoniques, les `hreflang`, les cartes sociales, le sitemap et `robots.txt` sans imposer un domaine personnalisé dans les templates.

## Mettre à jour le contenu

1. Modifier `data/profile.json`.
2. Respecter les dates et métriques documentées ; ne pas compléter une information incertaine par supposition.
3. Lancer `npm test`.
4. Vérifier visuellement les versions FR et EN sur mobile et ordinateur.

Les pages HTML de `fr/` et `en/`, `index.html`, `sitemap.xml`, `robots.txt` et `llms.txt` sont générés. Il faut modifier leur source, pas leurs copies, puis relancer le build.

Les données de référence actuelles sont :

- Evina : juin 2022 à juin 2024 ;
- Sapiendo : février 2021 à mai 2022 ;
- Groupe Blachère : décembre 2020 à janvier 2021, CDD couvrant deux mois calendaires pour un mois de travail effectif ;
- SensioLabs : avril à septembre 2018, six mois ;
- Norsys : 2016 à 2018, mois exacts non documentés ;
- Activ’Company : décembre 2013 à janvier 2015, un an et deux mois ; YouMiam : décembre 2013, un mois, avant Activ’Company ;
- E-testing et Indexx : dates non documentées ;
- transition professionnelle : depuis juillet 2024 ;
- Sonomundi : développement démarré en décembre 2025 ;
- formation Studi Chef de projet événementiel : commencée en juillet 2024, 1 000 heures attestées, parcours non finalisé faute de stage possible dans la région ;
- compatibilité Sonomundi/emploi : confirmée ; side project hors temps de travail, suspendable et sans incidence sur la disponibilité complète pour un employeur ;
- date de prise de poste : non confirmée, donc aucune disponibilité « immédiate » n’est affichée.

Les sources actives distinguent la transition professionnelle commencée en juillet 2024 du développement de Sonomundi commencé en décembre 2025. Le rapport d’audit conserve la trace de l’ancienne contradiction et de sa correction.

## CV Markdown, HTML et PDF

Sources officielles :

- `cv-short.md`, `cv-short-en.md` : CV prioritaires, limités à une seule page A4 ;
- `cv-final.md`, `cv-final-en.md` : CV master détaillés non spécialisés par langage ;
- `cv-ats.md`, `cv-ats-en.md` : versions texte compatibles ATS.

Les anciennes variantes spécialisées, dont France Travail et Darwin Partners, sont
conservées dans `archive/cv-specialises/` avec leurs rendus existants. Elles ne
doivent pas être régénérées lors d’une mise à jour courante des CV officiels.

Générer un CV :

```bash
node scripts/render-cv.js cv-short.md
```

Générer les six CV officiels :

```bash
npm run render:cv:all
```

Cette commande ne parcourt pas l’archive. Une variante spécialisée ne doit être
restaurée ou régénérée manuellement que pour reprendre la candidature concernée.

Le générateur :

- bloque toute formulation relative à une autorisation ou un permis de travail ;
- impose le lien `CV complet : https://axxon.github.io/` dans l’en-tête ;
- produit un PDF recruteur dont le nom commence par `Sebastien-Grans-CV` ;
- conserve les alias techniques historiques comme `dist/cv-short.pdf`.

Fichiers à remettre en priorité :

- `dist/Sebastien-Grans-CV.pdf` ;
- `dist/Sebastien-Grans-CV-EN.pdf` pour la version anglaise.

Les alias sans nom servent uniquement à la compatibilité des anciens liens et scripts.

## Vérifications locales

Le contrôle intégré couvre :

- présence des six routes ;
- liens et ressources locales, y compris les PDF ;
- une seule balise `main`, un seul `h1` et hiérarchie H1–H3 ;
- séparation FR/EN et absence de l’ancien contenu masqué ;
- `canonical`, `hreflang`, Open Graph, Twitter Cards et données structurées `Person` ;
- dimensions et textes alternatifs des images ;
- limite de 20 compétences sur l’accueil ;
- chronologie Evina/Sonomundi, date de prise de poste non confirmée et compatibilité du side project avec un emploi ;
- absence de formulation relative au droit de travailler ;
- présence du lien vers le CV complet dans les sources officielles.

```bash
npm test
```

Contrôles PDF utiles après génération :

```bash
pdfinfo "dist/Sebastien-Grans-CV.pdf"
pdfinfo -url "dist/Sebastien-Grans-CV.pdf"
pdftotext "dist/Sebastien-Grans-CV.pdf" -
npm run check:pdf
```

### Validation HTML, axe et Lighthouse

Lancer d’abord le serveur dans un terminal :

```bash
npm run serve
```

Puis, dans un autre terminal :

```bash
npx --yes html-validate@10.17.0 "fr/**/*.html" "en/**/*.html" "heavents-recruiter-pack/*.html" index.html black.html
npm run check:browser
npx --yes @axe-core/cli@4.12.1 http://127.0.0.1:4173/fr/ http://127.0.0.1:4173/en/ http://127.0.0.1:4173/fr/cv/ http://127.0.0.1:4173/en/cv/ http://127.0.0.1:4173/fr/sonomundi/ http://127.0.0.1:4173/en/sonomundi/ --chrome-path=/usr/bin/google-chrome --chrome-options=no-sandbox --exit
npx --yes lighthouse@12.8.2 http://127.0.0.1:4173/fr/ --chrome-flags="--headless --no-sandbox" --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=./tmp/lighthouse-fr.json
```

Ces outils sont volontairement exécutés à la demande pour ne pas ajouter de dépendances au site publié.

## Accessibilité

Objectif : WCAG 2.2 AA autant que possible.

Le socle comprend :

- lien d’évitement ;
- navigation native au clavier, sans menu mobile dépendant de JavaScript ;
- ordre DOM identique à l’ordre visuel ;
- focus fortement visible ;
- cibles interactives d’environ 44 px minimum ;
- contrastes sobres et liens soulignés ;
- titres hiérarchisés ;
- textes alternatifs et dimensions d’images ;
- contenu utilisable à 200 % de zoom ;
- absence d’animation permanente et prise en compte de `prefers-reduced-motion`.

Les tests automatisés ne remplacent pas une vérification clavier, zoom et lecteur d’écran.

## SEO et performance

Chaque route possède un titre, une description, un canonical, des alternatives linguistiques, Open Graph, Twitter Cards et des données structurées `Person`. Le dépôt contient aussi :

- `sitemap.xml` ;
- `robots.txt` avec l’adresse du sitemap ;
- `assets/favicon.svg` ;
- `assets/social-card.png` et `assets/social-card-en.png` ;
- `llms.txt`.

Le site utilise les polices système, aucun JavaScript front-end et aucune animation permanente. Les captures Sonomundi sont chargées paresseusement avec dimensions explicites. La photo de profil, légère, est la seule image prioritaire de l’accueil.

## Pack recruteur Sonomundi

`heavents-recruiter-pack/` contient :

- l’architecture anonymisée FR/EN ;
- les réponses aux questions techniques FR/EN ;
- les captures du parcours, des tests, d’OpenAPI et de l’architecture.

L’étude de cas distingue explicitement ce qui est démontrable, en cours, expérimental et non validé en production réelle. Sonomundi est présenté comme un side project personnel de long terme, non salarié, sans calendrier pressant et développé hors temps de travail. Les réponses techniques expliquent aussi son caractère suspendable et l’automatisation prévue pour limiter la maintenance et les interruptions.

Avant toute publication, ne jamais ajouter de secret, `.env`, URL d’administration sensible, log interne ou capture non anonymisée.

## Déploiement GitHub Pages

1. Lancer `npm test` et `npm run render:cv:all`.
2. Publier le contenu statique depuis la branche choisie et le dossier `/ (root)`.
3. Vérifier `/fr/`, `/en/`, les quatre sous-pages et les PDF nommés.
4. Vérifier les URL canoniques dans le HTML publié.

Le dépôt ne nécessite aucune action de build côté GitHub Pages si les fichiers générés sont versionnés avant déploiement.

## Domaine personnalisé

Le dépôt ne choisit aucun domaine à la place du propriétaire.

Pour en ajouter un :

1. configurer les enregistrements DNS selon la documentation de l’hébergeur ;
2. créer un fichier `CNAME` à la racine contenant uniquement le domaine choisi, par exemple `cv.example.com` ;
3. reconstruire avec l’URL publique :

   ```bash
   SITE_URL=https://cv.example.com npm run build
   ```

4. publier le fichier `CNAME` et les pages régénérées ;
5. activer ou imposer HTTPS dans GitHub Pages ;
6. vérifier le certificat, les redirections HTTP→HTTPS, les canonicals, le sitemap et les `hreflang` sur le domaine final.

Ne pas ajouter de `CNAME` tant que le domaine n’est pas réellement choisi et configuré.
