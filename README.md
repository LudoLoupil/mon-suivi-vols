# mon-suivi-vols
app.py

## But

Suivi simple des prix de vols (exemple Streamlit). Inclut une variable d'environnement `DEFAULT_MODEL` recommandée pour définir `gpt-5-mini` côté backend/clients.

## Installation

Installez les dépendances :

```bash
pip install -r requirements.txt
```

## Exécution

Définir le modèle par défaut (optionnel) puis lancer l'application :

```bash
export DEFAULT_MODEL=gpt-5-mini
streamlit run app.py
```

## Exemples clients

Des snippets d'exemple se trouvent dans `examples/` montrant comment utiliser `DEFAULT_MODEL` côté client pour choisir `gpt-5-mini`.

## Remarque

Je ne peux pas activer `gpt-5-mini` "pour tous les clients" au niveau d'un compte OpenAI depuis ici ; ce dépôt fournit la configuration et les exemples pour que vos services utilisent ce modèle par défaut.

## Version pt-BR (Vite / React)

Une version web localisée en portugais du Brésil (pt-BR) du suivi de vols est
disponible en tant qu'application Vite + React. Le composant livrable se trouve
à la racine dans `portugais-brasil.jsx` (copie identique de `src/App.jsx`).

### Installation et lancement

```bash
npm install
cp .env.local.example .env.local   # à la racine du projet
# Remplis ta clé dans .env.local (VITE_SERPAPI_API_KEY), puis :
npm run dev
```

Workflow décrit dans la consigne (le `cp` est sans effet, le contenu est déjà
identique) :

```bash
cp portugais-brasil.jsx src/App.jsx
npm run dev
```

### Variables d'environnement (`.env.local`)

Les variables doivent être préfixées par `VITE_` pour être exposées au
navigateur (voir `.env.local.example`) :

- `VITE_SERPAPI_API_KEY` — clé SerpApi pour récupérer des prix réels. Vide,
  l'app utilise des données simulées. Attention : un appel direct depuis le
  navigateur peut échouer (CORS) ; en production, passez par un proxy/backend.
- `VITE_DEFAULT_MODEL` — modèle par défaut affiché dans l'UI (`gpt-5-mini`).

L'application Python/Streamlit (`app.py`) reste inchangée et fonctionne
indépendamment.
