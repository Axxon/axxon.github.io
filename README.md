# presentation

Page de présentation statique prête pour GitHub Pages.

## Fichiers

- `index.html`: page d'accueil
- `styles.css`: style harmonisé avec `public-worklog`
- `cv.md`: source Markdown d'origine

## Publication sur GitHub

```bash
git init
git branch -M main
git remote add origin git@github.com:Axxon/presentation.git
git add .
git commit -m "feat: homepage CV"
git push -u origin main
```

## Activation GitHub Pages

1. Ouvrir `Settings > Pages` du repo `Axxon/presentation`.
2. Source: `Deploy from a branch`.
3. Branch: `main` et dossier `/ (root)`.
4. Sauvegarder.

Lien ajouté vers le projet en cours: `https://axxon.github.io/public-worklog/`.
