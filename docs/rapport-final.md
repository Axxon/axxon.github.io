# Rapport final de refonte du portfolio/CV

Rapport du 16 juillet 2026. L’état initial et les contradictions relevées avant modification sont conservés dans [`docs/audit-initial.md`](audit-initial.md).

## 1. Résumé des modifications

- Remplacement du CV bilingue monolithique par six routes statiques FR/EN, une langue par contenu principal.
- Réduction de l’accueil français d’environ 2 011 à 706 mots visibles, soit près de 65 %, et de l’accueil anglais de 1 873 à 677 mots.
- Hero recentré sur le poste, la valeur, le mode de travail et deux CTA : téléchargement du CV et étude de cas Sonomundi.
- Limitation de l’accueil à quatre groupes et vingt compétences visibles.
- Mise en avant de trois preuves courtes, puis d’une expérience professionnelle condensée à trois points par poste.
- Création d’un CV détaillé et d’une étude de cas Sonomundi en français et en anglais.
- Centralisation des faits et contenus du site dans `data/profile.json`.
- Ajout d’un build sans framework, de contrôles statiques, de tests navigateur, de contrôles PDF et d’un serveur local.
- Renforcement de l’accessibilité, du responsive, du SEO, des cartes sociales et du pipeline PDF.
- Conservation des alias PDF existants et création de sept PDF destinés aux recruteurs dont le nom commence par `Sébastien Grans - CV`.
- Réécriture du README avec build, génération, tests, publication et domaine personnalisé.

## 2. Fichiers créés, modifiés ou générés

### Créés

- `data/profile.json`
- `fr/index.html`
- `fr/cv/index.html`
- `fr/heavents/index.html`
- `en/index.html`
- `en/cv/index.html`
- `en/heavents/index.html`
- `assets/favicon.svg`
- `assets/social-card.svg`
- `assets/social-card.png`
- `assets/social-card-en.svg`
- `assets/social-card-en.png`
- `scripts/build-site.js`
- `scripts/check-site.js`
- `scripts/check-pdfs.js`
- `scripts/serve.js`
- `tests/browser.spec.js`
- `package.json`
- `package-lock.json`
- `sitemap.xml`
- `docs/audit-initial.md`
- `docs/rapport-final.md`
- sept PDF recruteur dans `dist/` : général FR/EN, détaillé FR/EN, ATS FR/EN et France Travail.

### Modifiés

- `.gitignore`
- `README.md`
- `index.html`
- `black.html`
- `styles.css`
- `robots.txt`
- `llms.txt`
- `scripts/render-cv.js`
- `scripts/render-heavents-pack.js`
- `cv-short.md`, `cv-short-en.md`
- `cv-final.md`, `cv-final-en.md`
- `cv-ats.md`, `cv-ats-en.md`
- `cv-pole-emploi.md`
- `cv-celad-laravel.md`
- `cv-audiowizard.md`
- `heavents-pack-entretien.md`
- les quatre HTML générés de `heavents-recruiter-pack/`
- les HTML/PDF techniques existants de `dist/cv-short*`, `dist/cv-final*`, `dist/cv-ats*` et `dist/cv-pole-emploi*`.

`cv-print.css` contenait déjà des modifications locales avant la mission ; elles ont été préservées et utilisées pour les nouveaux rendus PDF.

### Supprimés

Aucun fichier ni PDF existant n’a été supprimé.

## 3. Décisions éditoriales

### Supprimé de l’accueil

- la longue meta `keywords` ;
- les listes exhaustives de technologies ;
- la formation, les loisirs, les projets personnels secondaires et les détails anciens ;
- les descriptions bilingues présentes simultanément ;
- le statut de disponibilité non daté ;
- le zoom et le sélecteur de thème flottants ;
- le GIF Sonomundi animé ;
- les métriques de lignes de code, de commits et de fichiers.

### Déplacé

- les compétences secondaires, la formation, les autres expériences et les projets personnels vers le CV détaillé ;
- Codex, MCP, Paperclip et LangChain/LangGraph vers l’étude de cas ;
- l’architecture, les rôles, les données, les tests, la CI/CD, l’observabilité et les limites Sonomundi vers la page dédiée ;
- les captures vers la fin de l’étude de cas avec chargement différé.

### Condensé

- chaque expérience de l’accueil tient à trois réalisations maximum et une ligne de stack ;
- chaque preuve suit contexte, action et résultat observable ;
- la proposition de valeur tient en une phrase et la ligne technique en une phrase ;
- les compétences d’accueil sont limitées à vingt éléments.

### Conservé

- le positionnement back-end senior PHP, Laravel et Symfony ;
- les coordonnées, GitHub, LinkedIn, la Lozère, le full remote initial et l’ouverture au déménagement ;
- les faits, entreprises, dates et technologies documentés ;
- les PDF et leurs alias historiques ;
- une version ATS distincte ;
- les preuves techniques Sonomundi vérifiables et datées.

### Métriques

Les volumes de code ne figurent plus sur l’accueil ni comme argument principal de l’étude de cas. Un inventaire statique de `gitea/main`, réalisé le 16 juillet 2026 sans exécuter la suite, compte 2 189 tests PHPUnit déclarés dans 401 fichiers PHP du monorepo : 1 687 méthodes `test*` et 502 méthodes `#[Test]`. Cette métrique décrit la codebase et n'est jamais présentée comme un run complet réussi ; les jeux de données peuvent modifier le nombre de cas réellement exécutés. Les 3 320 commits restent un contexte secondaire, jamais une preuve principale de qualité. La matrice Playwright de 683 scénarios passés et 0 échec est contextualisée séparément dans l’étude de cas.

### Intelligence artificielle

L’IA n’est plus un axe identitaire du hero. L’accueil décrit une méthode fondée sur les branches isolées, les tests, Docker/CI, l’auto-review des pull requests et la documentation des changements. Les noms d’outils et les limites sont réservés à l’étude de cas, qui indique explicitement l’absence d’auto-merge et le fait que le LLM n’est pas une source de vérité.

### Sonomundi

L’accueil ne contient qu’une présentation détaillée de Sonomundi, dans une section identifiée comme « side project personnel · expérience non salariée ». Le projet est présenté comme une démarche de long terme, destinée à une sortie progressive lorsqu’elle sera suffisamment aboutie, sans calendrier pressant. Le contenu précise que le développement reste hors temps de travail, peut être mis en pause et n’affecte pas la disponibilité complète pour un employeur. L’automatisation vise à limiter la maintenance et les interruptions.

### Formation événementielle

Le CV détaillé et l’étude de cas indiquent que Sonomundi a initié l’envie de mieux connaître les métiers de l’événementiel, puis qu’un parcours Chef de projet événementiel a été suivi chez Studi. Les 1 000 heures sont présentées comme attestées ; le parcours est explicitement indiqué comme non finalisé faute de stage possible dans la région. Aucun diplôme ou certification obtenue n’est revendiqué.

## 4. Incohérences ou confirmations restantes

- La date de décembre 2025 est retenue comme début de développement de Sonomundi car elle est la mieux documentée. Les sources actives repérées avec un ancien début en juillet 2024 ont été corrigées le 20 juillet 2026 ; juillet 2024 désigne uniquement le début de la transition professionnelle.
- Le rescan complet de l’espace de travail trouve 97 fichiers Markdown hors sources officielles contenant encore au moins une ancienne formulation (« démarche entrepreneuriale », « validation/revue humaine » ou équivalent anglais), et 78 contenant une ancienne plage de dates Sonomundi. Ce sont principalement des brouillons de candidatures, contenus LinkedIn et archives non suivis ou ignorés par Git : ils n’entrent ni dans le build ni dans les PDF officiels et n’ont pas été réécrits en masse pour préserver leur contexte. Ils ne doivent pas être envoyés sans régénération ou relecture.
- Le candidat confirme que Sonomundi n’empiète pas sur un emploi à temps plein. La date exacte de prise de poste reste en revanche non confirmée ; le site n’affiche donc pas « disponible immédiatement ».
- La date de la formation Studi n’est pas documentée dans le dépôt et reste volontairement absente. L’attestation de 1 000 heures n’est pas présente dans les fichiers publics : elle est mentionnée sur la base de l’information fournie par le candidat, sans lien de téléchargement.
- La démo recruteur répond actuellement en HTTP 200, mais sa pérennité et son niveau d’accès doivent être vérifiés avant chaque envoi.
- Les mois exacts de Norsys ne sont pas documentés ; le libellé `2016–2018` est conservé. SensioLabs est désormais documenté d’avril à septembre 2018, soit six mois.
- Le niveau d’anglais C1 reste une estimation sans certification officielle et est présenté comme tel.
- Les métriques Sonomundi sont des instantanés datés, pas des indicateurs live. Elles doivent être remesurées avant toute mise à jour publique.
- LinkedIn bloque le contrôle automatisé avec un statut 999 ; Evina répond 403 à `curl` et SensioLabs échoue au contrôle TLS `curl`, bien que ces deux sites aient été accessibles via navigateur pendant l’audit. Une vérification manuelle périodique reste nécessaire.

## 5. Résultats des tests

| Contrôle | Commande | Résultat |
| --- | --- | --- |
| Build et contrôles statiques | `npm test` | Succès : six routes principales, 21 cibles locales, 20 compétences d’accueil. |
| Validation HTML | `npx --yes html-validate@10.17.0 "fr/**/*.html" "en/**/*.html" "heavents-recruiter-pack/*.html" index.html black.html` | Succès, aucune erreur. |
| Responsive, langues, clavier et PDF prioritaires | `npm run check:browser` | 4 tests Playwright réussis sur dix pages ; reflow à 320/640 px, ordre de tabulation, focus visible et PDF FR/EN accessibles. |
| Accessibilité automatisée | `npx --yes @axe-core/cli@4.12.1 … --exit` | 0 violation détectée sur les dix pages testées. |
| Génération des CV | `npm run render:cv:all` puis `node scripts/render-cv.js cv-pole-emploi.md` | Succès : sept PDF recruteur et sept alias techniques. |
| Contenu et liens PDF | `npm run check:pdf` | Succès : extraction texte, identité, Evina, Sapiendo, Sonomundi, dates, liens cliquables et absence de formulation interdite. |
| Garde-fou négatif | `node scripts/render-cv.js AGENTS.md` | Échec attendu : le générateur bloque la formulation interdite présente dans le fichier de règles. |
| Qualité du diff | `git diff --check` | Succès. |
| Domaine configurable | `SITE_URL=https://cv.example.com npm run build` puis build normal | Succès : canonicals, sitemap, robots et pack Sonomundi basculent vers l’URL fournie ; le build normal a ensuite restauré le domaine actuel. |

### Lighthouse final

Lighthouse 12.8.2 a été exécuté en mode mobile local avec Chrome headless.

| Page | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/fr/` | 100 | 100 | 100 | 100 | 1,1 s | 0 | 0 ms |
| `/en/` | 100 | 100 | 100 | 100 | 1,2 s | 0 | 0 ms |
| `/fr/sonomundi/` | 100 | 100 | 100 | 100 | 0,9 s | 0 | 0 ms |

Les scores locaux sont reproductibles sur cet environnement, mais ne garantissent pas les mêmes valeurs après déploiement ou selon le réseau du visiteur.

### Contrôles visuels et manuels

- accueil inspecté en 1 440 × 1 100 et 390 × 844 ;
- CV anglais inspecté en 390 × 844 ;
- étude de cas inspectée en 1 440 × 1 100 ;
- première page des PDF court FR/EN, détaillé FR et ATS FR inspectée après rasterisation ;
- navigation native et focus vérifiés par Playwright ;
- aucun débordement horizontal à 320 ou 640 px.

Un test réel avec lecteur d’écran et sur appareil mobile physique n’a pas été exécuté. Axe et Playwright ne remplacent pas ce contrôle manuel.

## Relecture selon les cinq profils

| Profil | Point vérifié | Correction ou conclusion |
| --- | --- | --- |
| Recruteur généraliste, 30 secondes | identité, poste, valeur, ancienneté, mode de travail, preuves et CTA | Hero raccourci, deux boutons prioritaires, trois preuves immédiatement identifiables. |
| Lead développeur PHP | profondeur PHP/Laravel/Symfony, architecture, APIs, qualité et production | CV détaillé, stacks courtes et étude de cas à quatorze sections. |
| Responsable sceptique vis-à-vis de l’IA | responsabilité, validation et limites | IA reléguée à un outil ; branches isolées, tests, Docker/CI, auto-review des pull requests, documentation de validation, aucun auto-merge et limites de production explicites. |
| Utilisateur mobile | ordre de lecture, CTA, navigation, reflow et poids | Contenu avant photo sur mobile, boutons pleine largeur, navigation sans JavaScript, aucun débordement à 320 px. |
| Utilisateur clavier | lien d’évitement, ordre de tabulation, focus et contrôles natifs | Test Playwright réussi ; focus contrasté et aucun menu mobile scripté. |

## 6. Prochaines étapes externes réellement utiles

1. Confirmer la date exacte de prise de poste à afficher lors d’une prochaine candidature et régénérer les variantes locales créées avant la clarification du side project.
2. Choisir et acheter éventuellement un domaine, puis appliquer la procédure `CNAME`/HTTPS documentée dans le README.
3. Vérifier la démo recruteur avant chaque envoi et décider si son accès doit rester public, protégé ou limité à l’entretien.
4. Mesurer des métriques réelles de latence, erreurs, disponibilité et déploiement uniquement si Sonomundi atteint un usage de production réel.
5. Faire un passage final avec lecteur d’écran et sur au moins un appareil mobile physique.
