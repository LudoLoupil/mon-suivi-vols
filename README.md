# apprendre-portugais-bresil

Suivi des prix de vols **Paris → Hurghada**, version web localisée en
**portugais du Brésil (pt-BR)** — application Vite + React.

🔗 **En ligne :** https://ludoloupil.github.io/apprendre-portugais-bresil/

Le composant livrable se trouve à la racine dans `portugais-brasil.jsx`
(copie identique de `src/App.jsx`).

## Installation et lancement (local)

```bash
npm install
cp .env.local.example .env.local   # à la racine du projet
# Renseigne ta clé dans .env.local (VITE_SERPAPI_API_KEY) si besoin, puis :
npm run dev
```

L'app fonctionne **sans clé API** : elle affiche des données simulées. La
clé SerpApi est optionnelle.

## Variables d'environnement (`.env.local`)

Les variables doivent être préfixées par `VITE_` pour être exposées au
navigateur (voir `.env.local.example`) :

- `VITE_SERPAPI_API_KEY` — clé SerpApi pour récupérer des prix réels. Vide,
  l'app utilise des données simulées. Attention : un appel direct depuis le
  navigateur peut échouer (CORS) ; en production, passez par un proxy/backend.
- `VITE_DEFAULT_MODEL` — modèle par défaut affiché dans l'UI (`gpt-5-mini`).

## Déploiement

Le site est publié via **GitHub Pages** par le workflow
`.github/workflows/deploy.yml`. Toute modification fusionnée dans `main`
redéploie automatiquement le site (~1-2 min).
