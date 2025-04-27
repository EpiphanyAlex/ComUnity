import requests
import json  # for pretty-printing if needed

params = {
    "engine": "google_events",
    "q": "Events in Melbourne",
    "location": "Melbourne, Victoria, Australia",
    "api_key": "29b67bf4b84d129aa05fe51b84b0be027895b9719683081021099bc5241355f0"
}

url = "https://serpapi.com/search"

response = requests.get(url, params=params)

if response.status_code == 200:
    data = response.json()
    print(json.dumps(data, indent=2))  # <--- FULL JSON output, clean readable
else:
    print(f"Failed to fetch events. Status Code: {response.status_code}")
