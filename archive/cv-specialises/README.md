# Archive des CV spécialisés

Cette archive conserve les variantes créées pour des entreprises, des offres ou
des usages précis. Elles ne font plus partie des sources actives.

- `sources/` contient les fichiers Markdown.
- `rendus/html/` contient les derniers rendus HTML disponibles.
- `rendus/pdf-aliases/` contient les PDF portant leur ancien nom technique.
- `rendus/pdf-recruteur/` contient les PDF nommés pour un envoi à un recruteur.

Les six CV actifs restent à la racine :

- `cv-short.md` et `cv-short-en.md`
- `cv-final.md` et `cv-final-en.md`
- `cv-ats.md` et `cv-ats-en.md`

`npm run render:cv:all` ne régénère que ces six versions. Pour reprendre une
candidature spécialisée, utiliser explicitement sa source archivée, par exemple :

```bash
node scripts/render-cv.js archive/cv-specialises/sources/cv-darwin-partners-llm-engineer-4436355269.md
```
