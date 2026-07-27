# Règles du projet CV

Ces règles s'appliquent à tous les CV, variantes ciblées et fichiers générés dans ce dépôt.

## Positionnement et dates de Sonomundi

- Toujours présenter Sonomundi comme un projet parallèle, en dehors de l'expérience professionnelle salariée.
- Sonomundi a commencé en décembre 2025. Ne jamais utiliser juillet 2024 comme date de début de Sonomundi.
- Utiliser la ligne anglaise : `December 2025–Present · Side project, now largely automated`.
- Utiliser la ligne française : `Décembre 2025–aujourd’hui · Projet parallèle, désormais largement automatisé`.
- Juillet 2024 correspond au début de la formation Studi, pas au début de Sonomundi.

## Chronologie canonique du CV

- Evina : `Juin 2022–juin 2024` / `June 2022–June 2024`.
- Le poste Evina a été supprimé dans le cadre d’un licenciement économique. Lorsque cette précision aide à expliquer la transition, utiliser une formulation factuelle et neutre.
- Sapiendo : `Février 2021–mai 2022` / `February 2021–May 2022`, d’abord en CDI puis en freelance. Ne jamais présenter toute la période comme freelance et ne pas utiliser juin 2022 sans correction explicite de Sébastien.
- Groupe Blachère : Ingénieur d’études et de développement, CDD. Utiliser `Décembre 2020–janvier 2021 · 2 mois` / `December 2020–January 2021 · 2 months`. Ne jamais résumer cette mission par `2020–2021`.
- SensioLabs : `Avril–septembre 2018 · 6 mois` / `April–September 2018 · 6 months`.
- Norsys : `2016–2018`. Ne jamais utiliser `2013–2018` pour Norsys.
- Pour Norsys, citer les clients Franprix, Decathlon et Fiducial. Ne pas présenter Sébastien comme « référent technique de fait pour 3 développeurs ».
- Activ’Company : Développeur web, `Décembre 2013–janvier 2015 · 1 an 2 mois` / `December 2013–January 2015 · 1 year 2 months`, en alternance à Paris et sur site.
- YouMiam : Développeur web en alternance pendant `1 mois` en décembre 2013, avant Activ’Company. Utiliser `Décembre 2013 · 1 mois` / `December 2013 · 1 month` et ne jamais réutiliser `2015`.
- E-testing et Indexx : missions réalisées entre Sapiendo et Evina ; dates et durées non documentées, ne pas en inventer.
- Formation Studi : début en juillet 2024. L’attestation comptabilise 1 000 heures, hors travail personnel supplémentaire ; ne pas présenter un volume supérieur comme attesté.
- no-excuse : prototype open source créé en juillet 2026.
- Ne jamais mentionner no-excuse dans un CV, une variante ciblée ou un PDF de CV, sauf demande explicite de Sébastien.

## En-tête des CV

- Ne jamais afficher `Autorisation de travail UE`, `EU work authorization`, `authorized to work` ou une formulation équivalente dans un CV, en français comme en anglais.
- Ne pas remplacer cette mention par une autre phrase relative au permis de travail, à la citoyenneté ou au droit de travailler.
- L'en-tête peut indiquer uniquement la localisation, le mode de télétravail, la mobilité et le fuseau horaire lorsqu'ils sont utiles à la candidature.
- Toujours afficher le lien `CV complet : https://axxon.github.io/` dans l'en-tête, avec les coordonnées et liens professionnels.
- Le lien vers le CV complet doit être cliquable dans les rendus HTML et PDF.
- Cette interdiction s'applique aussi aux CV spécialisés créés automatiquement ou copiés depuis `jobSearch`.

## Vérification avant rendu

- Avant de générer un PDF, vérifier que la source ne contient aucune mention d'autorisation de travail.
- Ne jamais utiliser d’appels de note ou de références numérotées entre parenthèses comme `(1)`, `(2)` ou `(12)` dans un CV. Intégrer la preuve directement dans le texte ou via un lien explicite.
- Vérifier que l'en-tête contient `https://axxon.github.io/` avant de générer le PDF.
- Conserver les coordonnées, les liens professionnels et les contraintes de télétravail réellement utiles au poste ciblé.

## Nommage des PDF

- Tout PDF destiné à être envoyé ou présenté doit avoir un nom de fichier ASCII commençant par `Sebastien-Grans-CV`, sans accent ni espace.
- Pour une candidature ciblée, ajouter le nom de l'entreprise, par exemple `Sebastien-Grans-CV-NEOBRAIN.pdf`.
- Un alias technique sans le nom peut être conservé uniquement pour la compatibilité des scripts, mais il ne doit pas être le fichier remis au recruteur.

## Archivage des CV spécialisés

- Les six sources actives sont uniquement `cv-short.md`, `cv-final.md`, `cv-ats.md` et leurs équivalents anglais.
- Les variantes liées à une entreprise ou à une candidature sont conservées dans `archive/cv-specialises/`.
- Ne jamais régénérer en masse les CV archivés. Les restaurer ou les rendre manuellement uniquement si Sébastien demande de reprendre une candidature précise.
- La commande standard `npm run render:cv:all` doit rester limitée aux six CV actifs.
