import os
from openai import OpenAI

# Extrait le modèle par défaut depuis la variable d'environnement
DEFAULT_MODEL = os.environ.get("DEFAULT_MODEL", "gpt-5-mini")

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

def hello():
    resp = client.chat.completions.create(
        model=DEFAULT_MODEL,
        messages=[{"role": "user", "content": "Bonjour"}],
    )
    print(resp.choices[0].message.content)

if __name__ == "__main__":
    hello()
