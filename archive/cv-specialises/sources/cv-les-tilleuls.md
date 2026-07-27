# Sébastien Grans

**Lead développeur PHP/Symfony/Laravel - API Platform, qualité, delivery, open source**
Lozère, France · Full remote France/CET · ouvert au déménagement, cherche à changer de ville
CDI 35h accepté · déplacements ponctuels possibles
Email : [sebastien.grans@gmail.com](mailto:sebastien.grans@gmail.com)
GitHub : https://github.com/Axxon
LinkedIn : https://www.linkedin.com/in/axxonn/
Poste visé : CDI Lead développeur PHP / Développeur Symfony senior - Les-Tilleuls.coop

---

## Profil ciblé

Développeur back-end senior PHP/Symfony/Laravel avec 7 ans cumulés d'expérience professionnelle dans la conception, le développement et l'industrialisation d'applications web, APIs REST/OpenAPI et services métier. Mon point fort : transformer un besoin produit ou client en système exploitable, depuis l'étude et les choix d'architecture jusqu'aux tests, à la documentation, au déploiement et au suivi production.

Pour Les-Tilleuls.coop, le fit principal est PHP + Symfony/Laravel + API Platform + qualité + accompagnement technique. J'ai livré une API Symfony/API Platform métier en production chez Sapiendo, travaillé dans l'écosystème Symfony chez SensioLabs et Norsys, développé des services Laravel critiques chez Evina, puis construit Sonomundi, produit Laravel/Vue documenté et démontrable.

J'apporte aussi une pratique confirmée du full remote salarié, de la communication écrite, de la revue de code, du partage de connaissances, de la veille technique et des arbitrages transparents. Le modèle coopératif, la confiance, l'autogestion, la contribution open source et la transmission technique me donnent envie de travailler avec la coopérative.

---

## Adéquation Les-Tilleuls.coop

- **PHP, Symfony, Laravel, API Platform :** expériences concrètes sur Symfony 3 à 5.4, API Platform, Laravel/PHP 8, Doctrine/Eloquent, APIs REST/OpenAPI, auth, workers, commandes CLI et applications métier maintenues en production.
- **Lead et accompagnement :** missions Symfony chez Norsys pour Monoprix, Decathlon et Fiducial, revues de code quotidiennes chez Evina, accompagnement Laravel/Git chez Sapiendo et ateliers OOP/TDD/Xdebug.
- **Conseil, architecture et justification des choix :** clarification de besoins avec CTO, Product Owner, infra, prestataires et équipes client ; capacité à expliquer les compromis entre maintenabilité, performance, sécurité, dette technique, coût et risque de livraison.
- **Qualité, tests et documentation :** PHPUnit, Behat, Playwright/E2E, PHPStan/Larastan, Rector, Pint/PHPCS, OpenAPI/Scramble, documentation Notion/docs, diagrammes de séquence, monitoring post-déploiement et post-mortems.
- **Culture open source et R&D :** parcours marqué par Symfony/SensioLabs, API Platform, Laravel, Vue, Docker, outils libres et veille quotidienne ; envie de contribuer par le code, la documentation, les retours d'expérience et le partage technique.
- **Full remote et fonctionnement coopératif :** 5+ ans cumulés de full remote salarié, autonomie forte, écrit clair, transparence sur les blocages, feedback direct, rituels légers et intérêt pour une gouvernance partagée.
- **Anglais technique :** pratique professionnelle orale et écrite, échanges avec développeurs et interlocuteurs anglophones, animation d'ateliers techniques en anglais chez Evina.

## Projet technique récent

### Sonomundi - Produit Laravel/Vue événementiel/musical et workflow IA contrôlé
**Décembre 2025–aujourd’hui · Projet parallèle, désormais largement automatisé**
Projet personnel / product building - événementiel musical, web produit, APIs et IA contrôlée
Preuves techniques : [rapport Sonomundi](https://axxon.github.io/fr/sonomundi/) · Accès démo : [https://demo.electronic.sonomundi.com/](https://demo.electronic.sonomundi.com/)

- Produit Laravel 12 / Vue 3 / TypeScript porté seul en environnement privé de démonstration : cadrage métier, architecture applicative, navigation event/artist/track, auth multi-rôles, surfaces publiques/authentifiées/admin, workers, contrats API et documentation OpenAPI/Scramble.
- Preuve de product building récent : spécifications, découpage, modèles, services, tests, documentation, CI/CD, Docker/Make, supervision locale et arbitrages produit/technique.
- Volumétrie vérifiée le 2026-06-27 avec `cloc 2.09` : `269 066` lignes de noyau produit sur `1 582` fichiers et `127 755` lignes de tests produit sur `843` fichiers, hors dépendances et artefacts lourds.
- Validation démontrable : dernier run PHPUnit complet documenté `1965 passed / 14144 assertions`, captures Playwright du pack recruteur régénérées le 2026-06-27 avec `2 passed`, `0 failed`, OpenAPI/Scramble visible.
- Workflow IA contrôlé : specs -> lanes Codex/autopilot -> worktrees/branches -> validation Docker/Make -> reporters LLM -> revue humaine, sans auto-merge et sans exposer de secrets.

**Stack :** PHP 8.2, Laravel 12, Vue 3, TypeScript, Python/FastAPI, Redis, MySQL, PostgreSQL, Neo4j, Playwright, OpenAPI, Docker, CI/CD, k3s local, Grafana/Loki, GlitchTip/Sentry, Codex, MCP, Paperclip

---

## Expériences ciblées

### Evina - Développeur back-end senior
**Juin 2022 - Juin 2024**
FinTech, cybersécurité et paiements mobiles - [evina.com](https://www.evina.com/) · Full remote

- Développement Laravel/PHP sur services critiques à fort trafic : APIs, logique métier, WebSockets/Reverb, Octane/Swoole, workers asynchrones, détection de fraude mobile et produits SaaS internes.
- Livraison de fonctionnalités backend exploitables en production : clarification du besoin, choix d'architecture, implémentation, tests, documentation, déploiement, monitoring et corrections post-déploiement.
- Scalabilité et performance : indexation MySQL puis migration progressive de modèles Laravel Eloquent vers Redis sur données tracking/scoring fraude, avec canary deployment, surveillance Kibana/Grafana, rollback préparé, non-perte de données et compatibilité API.
- Authentification sécurisée : intégration Auth0/Laravel Sanctum sur 3 applicatifs Laravel + Dundas pour remplacer des logins séparés par un SSO multi-app clients externes ; export utilisateurs, commandes d'import, mapping rôles, tests et documentation.
- Architecture et production : Clean Architecture, Design Patterns, schema design, commandes CLI, async/queues/workers, Jenkins, GitLab CI, transition Kubernetes/GitHub, monitoring, diagnostic incidents et post-mortems.
- Qualité et transmission : revues de code quotidiennes sur 4 à 5 développeurs, security testing, refactoring core, préparation de montée PHP n+1 avec Rector, analyse statique, tests automatisés, documentation Notion et pédagogie Git.

**Stack :** PHP, Laravel, Laravel Octane/Swoole, Laravel Reverb/WebSockets, Laravel Sanctum, Auth0, Redis, MySQL, Docker, CLI, queues/workers, ELK/Kibana, Grafana, JavaScript, React, Jenkins, GitLab CI, GitHub, Kubernetes

### Sapiendo - Développeur back-end / DevOps
**Février 2021 - Mai 2022**
Services retraite et automatisation métier - [sapiendo-retraite.fr](https://www.sapiendo-retraite.fr/) · Full remote

- Conception et livraison d'une API Symfony 5.4 LTS/API Platform sécurisée JWT de conversion RIS PDF vers XML : upload multipart, parser, callback XML, download, tests e2e et documentation d'architecture.
- Modélisation API Platform des ressources Pdf/Xml, opérations custom upload/download/callback, client du microservice parser, collections Postman, catalogues de tests et diagrammes de séquence.
- Développement Laravel métier : formules de calcul retraite issues de textes officiels, Design Patterns, refactoring, tests et échanges réguliers avec le Product Owner.
- Mise en place CI/CD GitHub/Docker sur le composant PDF/XML, reprise des environnements Docker serveur/interface, dependency management Composer/npm/npx et contribution AWS CloudWatch/Sentry.
- Autonomie forte avec le CTO, coordination prestataire, revue de PR et accompagnement d'un développeur interne sur Laravel, Git, découpage de branches et qualité des livrables.

**Stack :** PHP 8, Symfony 5.4 LTS, Laravel, API Platform, Doctrine, JWT, Docker, GitHub CI/CD, Nuxt.js, Composer, npm/npx, Postman, AWS CloudWatch, Sentry

### SensioLabs - Développeur back-end
**2018 - 6 mois**
Écosystème Symfony et formation - [sensiolabs.com](https://sensiolabs.com/) · Full remote

- Réalisation d'un site événementiel interne en Symfony + Twig.
- Ajout d'endpoints API pour un client Alumni et croisement de données issues de multiples APIs internes afin d'exposer des synthèses de résultats via une API publique.
- Implémentation d'asynchronisme RabbitMQ pour découpler des traitements longs, tests BDD/unitaires et CI Docker/Travis.

**Stack :** Symfony 3/4, API Platform, React, Docker, RabbitMQ, Behat, Travis CI

### Norsys - Développeur Back-end
**2016 - 2018**
ESN, projets grands comptes - [norsys.fr](https://www.norsys.fr/) · Lyon et périphérie

- Missions Symfony pour Monoprix, Decathlon et Fiducial : CRM RH, registre LDAP et outil interne de suivi de rondes.
- Mission Decathlon : développement Symfony + Twig d'un registre LDAP full OOP avec formulaires dynamiques.
- Mission Fiducial : développement Symfony + Twig d'un outil interne de suivi des rondes d'agents de sécurité.

**Stack :** Symfony 3, Doctrine, PostgreSQL, optimisation SQL, Twig, Webpack, ES6, Docker, Vagrant

---

## Compétences clés

**Back-end & APIs :** PHP 8 · Symfony · Laravel · API Platform · APIs REST/OpenAPI · Doctrine/Eloquent · JWT · Laravel Sanctum · Auth0 · SSO · commandes CLI · workers/queues/async · WebSockets/Reverb · Octane/Swoole · RabbitMQ

**Données & performance :** MySQL · MariaDB · PostgreSQL · MongoDB · Redis/cache · SQL relationnel · indexation · optimisation de requêtes · database performance · migration de modèles · contraintes de continuité de service

**Front-end & intégration :** Vue 3 · TypeScript · Nuxt.js · React · Vite · Pinia · HTML5 · CSS3 · Twig · JavaScript ES2016+ · interfaces métier maintenables

**Qualité, sécurité & architecture :** PHPUnit · Behat · Playwright/E2E · PHPStan/Larastan · Rector · Pint · PHPCS · tests unitaires/intégration/fonctionnels · TDD · OOP · SOLID · PSR · Clean Architecture · Design Patterns · security testing · OWASP · revue de code

**Delivery & production :** Docker · Docker Compose · Make · GitHub CI/CD · GitLab CI/CD · Jenkins · Kubernetes/k3s · Nginx · AWS CloudWatch · ELK/Kibana · Grafana · Sentry/GlitchTip · monitoring · rollback · diagnostic incidents

**Collaboration & transmission :** full remote · autogestion · documentation technique · veille quotidienne · partage de connaissances · accompagnement développeurs · design reviews · arbitrages techniques · clarification client/produit · Agile/Scrum · anglais professionnel courant

---

## Autres expériences & formation

- **Groupe Blachère (2020-2021, hybride)** : microservice Symfony avec interface/API/Docker pour modéliser des contraintes logistiques de stockage et communiquer avec le coeur SaaS.
- **ActivCompany / YouMiam (2015)** : alternances Symfony2 sur réseau social professionnel sectoriel et réseau social culinaire ; Facebook Login, Elasticsearch, front et migration Doctrine/MariaDB.
- **E-testing / Indexx (indépendant)** : questionnaires techniques PHP vérifiés via Docker multi-versions ; mission courte OAuth, Twilio, NestJS.
- **Formation** : DEUST Webmaster, Université de Limoges (2012) · Piano jazz, Conservatoire d'Annecy (2008) · Bac STI (2005).
