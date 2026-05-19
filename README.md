# apprendre-portugais-bresil

Petite application web pour **apprendre le portugais du Brésil** :
vocabulaire par thèmes (cartes mémo), quiz à choix multiples et phrases
essentielles, avec prononciation à l'écrit et audio. Application Vite +
React, **100 % hors-ligne** : aucune clé API, aucun compte, aucune
connexion requise.

🔗 **Tester tout de suite (sans rien installer) :**
https://stackblitz.com/github/LudoLoupil/apprendre-portugais-bresil

## Contenu

- **Cartes** — vocabulaire FR → PT-BR par catégories (salutations,
  nombres, voyage, restaurant, au quotidien). Touche une carte pour la
  retourner.
- **Quiz** — retrouve la bonne traduction parmi 4 propositions, avec score.
- **Phrases** — expressions essentielles pour voyager / discuter.
- Bouton 🔊 : prononciation via la synthèse vocale du navigateur.

## Installation et lancement (local)

```bash
npm install
npm run dev
```

Puis ouvre l'URL indiquée par Vite (par défaut http://localhost:5173/).

Build de production : `npm run build` (sortie dans `dist/`, chemins
relatifs : déployable tel quel sur n'importe quel hébergeur statique).
