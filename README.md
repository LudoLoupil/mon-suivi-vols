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
# mon-suivi-vols
app.py
