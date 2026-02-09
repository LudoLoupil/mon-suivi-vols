import os
import requests
from typing import Tuple, List, Dict, Optional

SERPAPI_SEARCH_URL = "https://serpapi.com/search.json"

def fetch_flight_prices(origin: str, destination: str, date_from: str, date_to: str,
                        passengers_desc: str = "2 adults, 3 children",
                        api_key: Optional[str] = None) -> Tuple[Optional[List[Dict]], Optional[str]]:
    """Query SerpApi for flights. Returns (list_of_flights, error_message).

    Each flight dict contains: 'date', 'price', 'company'. If SerpApi key
    is missing or an error occurs, returns (None, error_message).
    """
    api_key = api_key or os.environ.get("SERPAPI_API_KEY")
    if not api_key:
        return None, "SERPAPI_API_KEY not set"

    q = f"Flights from {origin} to {destination} depart {date_from} return {date_to} {passengers_desc}"
    params = {"engine": "google_flights", "q": q, "api_key": api_key}

    try:
        resp = requests.get(SERPAPI_SEARCH_URL, params=params, timeout=15)
        resp.raise_for_status()
        data = resp.json()

        flights = []
        # Try common SerpApi flight keys; be defensive about structure.
        if isinstance(data, dict):
            # Primary option: 'flights' list
            if "flights" in data and isinstance(data["flights"], list):
                for item in data["flights"][:20]:
                    price = item.get("price") or item.get("best_price") or item.get("price_string")
                    company = item.get("airline") or item.get("carrier") or item.get("provider") or ""
                    date = item.get("date") or item.get("departure_date") or ""
                    # Normalize price to int when possible
                    price_val = None
                    if price is not None:
                        try:
                            price_val = int("".join(ch for ch in str(price) if ch.isdigit()))
                        except Exception:
                            price_val = None
                    flights.append({"date": date, "price": price_val, "company": company})
            # Fallback: shopping_results or results
            elif "shopping_results" in data and isinstance(data["shopping_results"], list):
                for item in data["shopping_results"][:20]:
                    flights.append({
                        "date": item.get("date", ""),
                        "price": item.get("price"),
                        "company": item.get("source", ""),
                    })

        return flights, None

    except Exception as e:
        return None, str(e)
