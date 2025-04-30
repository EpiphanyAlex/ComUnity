import requests
from datetime import datetime, date
from flask import Blueprint
from backend.models.models import db, Event, EventUpdateStatus

update_events_bp = Blueprint('update_events', __name__)

API_KEY = "YOUR_SERPAPI_KEY"
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

def fetch_and_store_events():
    url = "https://serpapi.com/search"
    response = requests.get(url, params=params)
    if response.status_code != 200:
        print("Failed to fetch event data")
        return

    data = response.json()
    events = data.get("events_results", [])

    # Clear existing events
    Event.query.delete()

    for event in events:
        e = Event(
            title=event.get("title"),
            address=str(event.get("address")),
            date=event.get("date", {}).get("start_date", "Unknown")
        )
        db.session.add(e)

    status = EventUpdateStatus.query.first()
    if not status:
        status = EventUpdateStatus(last_updated=date.today())
        db.session.add(status)
    else:
        status.last_updated = date.today()

    db.session.commit()
    print("Events updated.")
