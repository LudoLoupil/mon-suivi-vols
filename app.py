import os
import streamlit as st
import pandas as pd
import datetime
from serpapi_integration import fetch_flight_prices

# Récupère le modèle par défaut depuis la variable d'environnement ou `st.secrets`
DEFAULT_MODEL = os.environ.get("DEFAULT_MODEL")
try:
    DEFAULT_MODEL = DEFAULT_MODEL or st.secrets.get("DEFAULT_MODEL")
except Exception:
    DEFAULT_MODEL = DEFAULT_MODEL
DEFAULT_MODEL = DEFAULT_MODEL or "gpt-5-mini"

# Configuration de la page
st.set_page_config(page_title="Mon Tracker de Vols", page_icon="✈️")

st.title("✈️ Suivi de Vols : Paris - Hurghada")
st.write("Groupe : 2 Adultes, 3 Enfants (8, 13, 17 ans)")

# Barre latérale pour les paramètres
with st.sidebar:
    st.header("Paramètres")
    date_depart = st.date_input("Départ", datetime.date(2026, 4, 24))
    date_retour = st.date_input("Retour", datetime.date(2026, 5, 3))
    budget_max = st.number_input("Budget Max Total (€)", value=2500)
    st.markdown("---")
    st.caption(f"Modèle par défaut utilisé côté client/serveur: {DEFAULT_MODEL}")

# Simulation de données (À connecter à l'API SerpApi pour du réel)
data = {
    "Date de relevé": ["2026-02-01", "2026-02-05", "2026-02-09"],
    "Prix Total (€)": [2850, 2720, 2680],
    "Compagnie": ["Transavia", "Turkish Airlines", "Pegasus"]
}

df = pd.DataFrame(data)

# Si la clé SerpApi est configurée, tenter de récupérer des prix réels
serpapi_key = os.environ.get("SERPAPI_API_KEY")
try:
    serpapi_key = serpapi_key or st.secrets.get("SERPAPI_API_KEY")
except Exception:
    serpapi_key = serpapi_key

if serpapi_key:
    origin = "Paris"
    destination = "Hurghada"
    passengers_desc = "2 adults, 3 children"
    flights, err = fetch_flight_prices(origin, destination, str(date_depart), str(date_retour), passengers_desc, api_key=serpapi_key)
    if flights:
        # Convert to DataFrame if we got results and normalize
        rows = []
        for f in flights:
            rows.append({
                "Date de relevé": f.get("date") or datetime.date.today().isoformat(),
                "Prix Total (€)": f.get("price") or 0,
                "Compagnie": f.get("company") or ""
            })
        if rows:
            df = pd.DataFrame(rows)
    else:
        st.warning(f"SerpApi: pas de résultats ou erreur: {err}")

# Affichage des métriques
col1, col2 = st.columns(2)
dernier_prix = df["Prix Total (€)"].iloc[-1]
variation = dernier_prix - df["Prix Total (€)"].iloc[-2]

col1.metric("Prix Actuel", f"{dernier_prix} €", f"{variation} €", delta_color="inverse")
col2.metric("Passagers", "5", "Famille")

# Graphique d'évolution
st.subheader("Évolution du prix total")
st.line_chart(df.set_index("Date de relevé")["Prix Total (€)"])

# Liste des vols trouvés
st.subheader("Détails des options")
st.table(df)

if dernier_prix <= budget_max:
    st.success("✅ Le prix est dans votre budget ! Alerte envoyée.")
else:
    st.info("⌛ En attente d'une baisse de prix...")
