import requests

params = {
    "engine": "google_events",
    "q": "Events in Melbourne",
    "hl": "en",
    "gl": "au",  # country code
    "api_key": "29b67bf4b84d129aa05fe51b84b0be027895b9719683081021099bc5241355f0"  # 🔑 Get this from https://serpapi.com
}

response = requests.get("https://serpapi.com/search.json", params=params)

if response.status_code == 200:
    events = response.json().get("events_results", [])
    for event in events:
        print(f"🎉 {event['title']} - {event['date']['when']}")
        print(f"📍 Address: {', '.join(event.get('address', []))}")
        print(f"🔗 Link: {event['link']}")
        print("-" * 40)
else:
    print("❌ Failed:", response.status_code, response.text)
