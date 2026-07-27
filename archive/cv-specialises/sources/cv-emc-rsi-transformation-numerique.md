# Sébastien Grans

**Responsable SI / Transformation numérique - profil software senior, production, cyber, data, automatisation**
Lozère, France · mobilité Mende / Lozère · CDI
Email : [sebastien.grans@gmail.com](mailto:sebastien.grans@gmail.com)
GitHub : https://github.com/Axxon
LinkedIn : https://www.linkedin.com/in/axxonn/
Poste visé : Responsable Systèmes d'Information et Transformation Numérique

---

## Profil ciblé

Développeur back-end senior PHP/Laravel/Symfony avec 7 ans cumulés d'expérience professionnelle dans la conception, l'industrialisation et l'exploitation d'applications web, APIs, services métier critiques et environnements de production. Je candidate aujourd'hui à un rôle de Responsable SI / Transformation numérique en PME industrielle avec un positionnement clair : apporter un socle technique solide, une culture production/cyber/data et une capacité à transformer des besoins métiers en systèmes fiables, documentés et exploitables.

Mes expériences récentes couvrent des sujets proches du poste : services critiques à forte volumétrie, cybersécurité/paiements mobiles, Auth0/SSO, rôles et accès, sécurité applicative, CI/CD, Docker/Kubernetes, observabilité, diagnostic d'incidents, continuité de service, automatisation, APIs, reporting technique, données Redis/MySQL, documentation, accompagnement développeurs et coordination avec CTO, produit, infrastructure et prestataires.

Je ne viens pas d'un parcours DSI classique orienté administration de parc. Mon intérêt pour EMC est précisément de mettre mon expérience d'ingénierie logicielle, de production et de transformation outillée au service d'une entreprise industrielle locale : structurer la feuille de route numérique, sécuriser les systèmes, améliorer les flux de données, piloter des projets utiles aux équipes et accompagner l'adoption des outils.

---

## Adéquation avec le poste EMC

- **Transformation numérique :** cadrage de besoins métier, conception d'APIs et de services, automatisation de flux, digitalisation de processus, documentation et livraison incrémentale.
- **Cybersécurité et continuité :** Auth0/SSO, Laravel Sanctum, rôles et accès, security testing, dépendances, images Docker, monitoring, rollback, diagnostic incident, stabilité production et communication post-incident.
- **Données, reporting et BI :** Redis, MySQL/MariaDB, PostgreSQL, indexation, optimisation de requêtes, indicateurs techniques, logs, Grafana/Kibana, OpenAPI et structuration de données exploitables.
- **Infrastructure et prestataires :** Docker, CI/CD GitLab/GitHub/Jenkins, Kubernetes, Nginx, AWS CloudWatch, Sentry/GlitchTip, ELK/Grafana, coordination avec équipes infrastructure et prestataires.
- **Applications métiers :** développement et maintenance d'applicatifs métier critiques en FinTech, retraite réglementaire, logistique et SaaS ; attention à la traçabilité, à la non-régression et aux droits utilisateurs.
- **Innovation et IA :** usage encadré de Codex, MCP, Paperclip et LangChain/LangGraph pour analyse, documentation, tests, audit et correctifs, avec validation humaine, worktrees isolés et pas d'auto-merge.
- **Accompagnement du changement :** documentation Notion/docs, pédagogie Git, revues de code, ateliers techniques, échanges CTO/PO/infra/devs et capacité à expliquer les arbitrages simplement.
- **Contexte local :** installé en Lozère, intérêt pour un poste à impact direct dans une PME industrielle engagée dans l'économie circulaire et la transformation environnementale.

## Expériences récentes

### Evina - Développeur back-end senior
**Juin 2022 - Juin 2024**
FinTech, cybersécurité et paiements mobiles - [evina.com](https://www.evina.com/) · Full remote

- Développement sur services critiques à fort trafic : cybersécurité, paiements mobiles, détection de fraude mobile, APIs, WebSockets/Reverb, Octane/Swoole, workers asynchrones et environnement multi-région.
- Contribution à des services de détection de fraude : analyse de patterns, règles de détection, traitement de flux batch/temps réel, contraintes de latence, charge, traçabilité et faux positifs.
- Migration progressive de modèles Laravel Eloquent de MySQL vers Redis sur données de tracking et scoring/fraude, avec indexation MySQL, canary deployment, surveillance Kibana/Grafana, rollback préparé, continuité de service et compatibilité API.
- Authentification sécurisée : intégration Auth0 et Laravel Sanctum sur 3 applicatifs Laravel + Dundas pour remplacer des logins séparés par un SSO multi-app destiné à des clients externes.
- Gestion des rôles et accès : export/normalisation utilisateurs, import asynchrone, mapping des droits, guards/middlewares, tests, documentation et déploiement.
- Security testing : contrôles de vulnérabilités sur dépendances, points d'attention sur code produit et images Docker, sécurisation de configurations sensibles.
- Production et continuité : monitoring ELK/Grafana/logs, suivi des codes HTTP, erreurs 4xx/5xx, charge MySQL, temps de réponse, incidents, rollback et post-mortem.
- CI/CD et infrastructure applicative : Docker, Jenkins, GitLab CI, GitHub, transition Kubernetes avec l'équipe infrastructure, environnement multi-région.
- Revues de code quotidiennes sur 4 à 5 développeurs cross-product, documentation Notion/docs, design reviews, arbitrages performance/maintenabilité/risque et pédagogie Git.

**Stack :** PHP, Laravel, Laravel Sanctum, Auth0, Redis, MySQL, Docker, Kubernetes, Jenkins, GitLab CI, GitHub, ELK/Kibana, Grafana, WebSockets, queues/workers, React ponctuel

### Sapiendo - Développeur back-end / DevOps
**Février 2021 - Mai 2022**
Services retraite et automatisation métier - [sapiendo-retraite.fr](https://sapiendo-retraite.fr/) · Full remote

- Conception et livraison d'une API Symfony 5.4 LTS/API Platform sécurisée JWT de conversion RIS PDF vers XML : upload, parser, callback XML, téléchargement du résultat et source structurée pour algorithmes métier.
- Automatisation d'un flux documentaire métier critique avec tests unitaires, scénario end-to-end, documentation d'architecture, diagrammes de séquence et déploiement.
- Développement et maintenance d'un applicatif Laravel métier dans un domaine réglementaire : formules de calcul retraite, traçabilité, non-régression, parcours utilisateur Twig et échanges Product Owner.
- Mise en place CI/CD GitHub/Docker sur le composant de décodage PDF/XML, reprise des environnements Docker serveur/interface et dependency management Composer/npm/npx.
- Contribution à la migration AWS, supervision CloudWatch et Sentry, coordination avec prestataires et accompagnement d'un développeur interne.

**Stack :** PHP 8, Laravel, Symfony 5.4 LTS, API Platform, JWT, Docker, GitHub CI/CD, AWS CloudWatch, Sentry, Nuxt.js, Postman

### Norsys - Développeur Back-end
**2016 - 2018**
ESN, projets grands comptes - [norsys.fr](https://www.norsys.fr/) · Lyon et périphérie

- Missions Symfony pour Monoprix, Decathlon et Fiducial : CRM RH, registre LDAP et outil interne de suivi de rondes.
- Mission Decathlon : développement Symfony/Twig d'un registre LDAP full object-oriented avec formulaires dynamiques.
- Mission Fiducial : développement d'un outil interne de suivi des rondes d'agents de sécurité, authentification Symfony et architecture modulaire.

**Stack :** Symfony, Doctrine, PostgreSQL, LDAP, Twig, Webpack, Docker, Vagrant

### SensioLabs - Développeur back-end
**2018 - 6 mois**
Écosystème Symfony et formation - [sensiolabs.com](https://sensiolabs.com/) · Full remote

- Réalisation d'un site événementiel interne en Symfony/Twig.
- Ajout d'endpoints API, croisement de données issues de multiples APIs internes et exposition de synthèses via API publique.
- Asynchronisme RabbitMQ, tests BDD/unitaires et CI Docker/Travis.

---

## Produit technique personnel

### Sonomundi - Produit Laravel/Vue et workflow IA contrôlé
**Décembre 2025–aujourd’hui · Projet parallèle, désormais largement automatisé**
Preuves techniques : [rapport Sonomundi](https://axxon.github.io/fr/sonomundi/) · Accès démo : [https://demo.electronic.sonomundi.com/](https://demo.electronic.sonomundi.com/)

- Produit événementiel/musical Laravel 12 / Vue 3 / TypeScript porté seul, utilisé comme laboratoire d'ingénierie IA contrôlée et preuve de capacité à construire un système produit complet.
- Périmètre : APIs, auth multi-rôles, surfaces publiques/authentifiées/admin, navigation event/artist/track, workers, OpenAPI/Scramble, services Python/FastAPI et documentation.
- Volumétrie vérifiée le 2026-06-27 : `269 066` lignes de noyau produit sur `1 582` fichiers et `127 755` lignes de tests produit sur `843` fichiers, hors dépendances et artefacts lourds.
- Validation documentée : run PHPUnit complet `1965 passed / 14144 assertions`, captures Playwright `2 passed`, OpenAPI/Scramble, architecture anonymisée et revue humaine.
- Workflow IA : specs -> lanes Codex/autopilot -> worktrees et branches dédiés -> validation Docker/Make -> reporters LLM -> revue humaine ; pas d'auto-merge, secrets non exposés, LLM non source de vérité.

---

## Compétences clés

**Systèmes d'information & transformation :** cadrage de besoins métier · feuille de route technique · digitalisation de processus · automatisation · documentation · gouvernance de données applicatives · coordination prestataires · conduite du changement technique

**Cybersécurité & conformité applicative :** Auth0 · SSO · Laravel Sanctum · JWT · rôles et accès · security testing · dependency vulnerability checks · OWASP · protection des configurations sensibles · continuité de service · rollback · post-mortem

**Données & reporting :** MySQL/MariaDB · PostgreSQL · Redis · indexation · optimisation de requêtes · logs · indicateurs techniques · ELK/Kibana · Grafana · OpenAPI · structuration de données · bases de BI/reporting applicatif

**Infrastructure, cloud & exploitation :** Docker · Docker Compose · Kubernetes/k3s · GitLab CI/CD · GitHub CI/CD · Jenkins · Nginx · AWS CloudWatch · Sentry/GlitchTip · monitoring · diagnostic incidents · environnements multi-région

**Applications métiers & développement :** PHP 8 · Laravel · Symfony · API Platform · APIs REST/OpenAPI · Doctrine/Eloquent · queues/workers · RabbitMQ · WebSockets · Vue 3 · TypeScript · Nuxt.js · React ponctuel

**Leadership opérationnel :** revues de code · accompagnement développeurs · pédagogie Git · design reviews · arbitrages techniques · échanges CTO/PO/infra/prestataires · communication écrite · anglais professionnel courant

**IA & innovation :** Codex · Codex Skills · MCP · Paperclip · LangChain/LangGraph · workflows IA contrôlés · audit codebase · documentation assistée · tests et correctifs sous revue humaine

---

## Formation

- **2012** - DEUST Webmaster, Université de Limoges.
- **2008** - Diplôme de 3e cycle en piano jazz, Conservatoire d'Annecy.
- **2005** - Bac technologique STI, Lycée Baudelaire Annecy.

## Expériences complémentaires

- **Groupe Blachère (2020-2021)** : microservice Symfony avec interface/API/Docker pour outil logistique de stockage de produits frais.
- **ActivCompany / YouMiam (2015)** : alternances Symfony2 sur réseau social professionnel sectoriel et réseau social culinaire ; Facebook Login, Elasticsearch, migration Doctrine/MariaDB.
- **E-testing / Indexx (indépendant)** : questionnaires techniques PHP vérifiés via Docker multi-versions ; mission courte OAuth, Twilio, NestJS.
