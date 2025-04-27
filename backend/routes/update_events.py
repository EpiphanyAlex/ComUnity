import requests
from datetime import date
from flask import Blueprint
from models.models import db, Event, EventUpdateStatus

update_events_bp = Blueprint('update_events', __name__)

API_KEY = "YOUR_SERPAPI_KEY"
OPENCAGE_API_KEY = "3cbd03ab84f84061928fb58575d6c065"   # <--- your OpenCage API key here

params = {
    "engine": "google_events",
    "q": "Events in Melbourne",
    "location": "Melbourne, Victoria, Australia",
    "api_key": "29b67bf4b84d129aa05fe51b84b0be027895b9719683081021099bc5241355f0"
}

def should_update():
    status = EventUpdateStatus.query.first()
    if not status:
        return True
    return status.last_updated != date.today()

def geocode_address(address):
    url = "https://api.opencagedata.com/geocode/v1/json"
    params = {
        'key': OPENCAGE_API_KEY,
        'q': address,
        'pretty': 1,
        'limit': 1
    }
    try:
        response = requests.get(url, params=params)
        if response.status_code == 200:
            results = response.json()
            if results['results']:
                geometry = results['results'][0]['geometry']
                return float(geometry['lat']), float(geometry['lng'])
            else:
                print(f"⚠️ No geocoding results found for address: {address}")
                return None, None
        else:
            print(f"❌ Geocoding failed with status {response.status_code} for address: {address}")
            return None, None
    except Exception as e:
        print(f"❌ Geocoding error for address '{address}': {e}")
        return None, None

def fetch_and_store_events():
    url = "https://serpapi.com/search"
    response = requests.get(url, params=params)
    if response.status_code != 200:
        print("❌ Failed to fetch event data")
        return

    data = response.json()
    events = data.get("events_results", [])

    # Clear existing events
    Event.query.delete()
    db.session.commit()

    # Reset auto-increment counter
    from sqlalchemy import text
    try:
        db.session.execute(text("ALTER TABLE event AUTO_INCREMENT = 1"))
        db.session.commit()
    except Exception as e:
        print(f"⚠️ Warning resetting AUTO_INCREMENT: {e}")

    for event in events:
        raw_address = event.get("address", [])
        full_address = ", ".join(raw_address) if raw_address else "Unknown"

        latitude, longitude = geocode_address(full_address)

        e = Event(
            title=event.get("title"),
            address=full_address,
            date=event.get("date", {}).get("start_date", "Unknown"),
            latitude=latitude,
            longitude=longitude,
            link=event.get("link"),
            description=event.get("description"),
            venue_name=event.get("venue", {}).get("name"),
            venue_rating=event.get("venue", {}).get("rating"),
            venue_reviews=event.get("venue", {}).get("reviews"),
            thumbnail=event.get("thumbnail"),
            image=event.get("image")
        )
        db.session.add(e)

    status = EventUpdateStatus.query.first()
    if not status:
        status = EventUpdateStatus(last_updated=date.today())
        db.session.add(status)
    else:
        status.last_updated = date.today()

    db.session.commit()
    print("✅ Events updated with extra info.")
