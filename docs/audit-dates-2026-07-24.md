# Audit des dates du CV — 24 juillet 2026

Cet audit fixe la chronologie utilisée par les CV officiels et le site public. Une information fournie directement par Sébastien prévaut sur les anciens résumés générés ou les calculs automatiques de durée.

| Élément | Chronologie canonique | Niveau de confirmation | Décision |
| --- | --- | --- | --- |
| Evina | Juin 2022–juin 2024 | Profil structuré et contrôle LinkedIn corrigé concordants | Conserver |
| Sapiendo | Février 2021–mai 2022 | Sources CV historiques concordantes ; un ancien export LinkedIn indiquait juin 2022 mais contenait aussi des données périmées | Conserver mai 2022 tant que Sébastien ne le corrige pas explicitement |
| Groupe Blachère | Décembre 2020–janvier 2021 · CDD · 1 mois effectif | Sébastien confirme un mois travaillé ; LinkedIn compte automatiquement deux mois calendaires touchés | Afficher « 1 mois effectif » ; ne jamais résumer par « 2020–2021 » |
| SensioLabs | Avril–septembre 2018 · 6 mois | Export LinkedIn local et durée historique concordants | Afficher les mois et la durée |
| Norsys | 2016–2018 | Sources CV officielles concordantes ; mois exacts non documentés | Ne jamais utiliser « 2013–2018 », erreur issue de CV ciblés générés |
| Activ’Company | Décembre 2013–janvier 2015 · 1 an 2 mois | Dates et durée fournies directement par Sébastien | Conserver avec le rôle Développeur web |
| YouMiam | 2015 | Année seulement dans les sources officielles | Ne pas inventer les mois |
| E-testing | Date non documentée | Aucune date fiable retrouvée | Ne pas dater |
| Indexx | Date non documentée | Aucune date fiable retrouvée | Ne pas dater |
| Studi | Début en juillet 2024 | Confirmé directement par Sébastien | Conserver |
| Sonomundi | Début en décembre 2025 | Confirmé directement par Sébastien et par les preuves du projet | Conserver hors expérience salariée |
| no-excuse | Juillet 2026 | Dépôt et sources CV concordants | Conserver comme prototype open source |
| DEUST Webmaster | 2012 | Sources CV concordantes | Conserver |
| Piano jazz, Conservatoire d’Annecy | 2008 | Sources CV concordantes | Conserver |
| Bac technologique STT | 2005 | Sources CV concordantes | Conserver |

## Garde-fous ajoutés

- La chronologie canonique figure dans `AGENTS.md`.
- `data/profile.json` contient les bornes structurées des cinq expériences principales.
- Le générateur refuse les dates officielles divergentes et la plage erronée `Norsys 2013–2018`.
- Les contrôles HTML et PDF vérifient Sapiendo, Groupe Blachère, SensioLabs, Norsys, Studi, Evina et Sonomundi.
