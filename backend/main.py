from flask import Blueprint, jsonify
from app.models.models import Playground, db
import requests

main = Blueprint('main', __name__)

def fetch_and_insert_playgrounds():
    url = "https://data.melbourne.vic.gov.au/api/explore/v2.1/catalog/datasets/playgrounds/records?limit=20"
    response = requests.get(url)

    if response.status_code != 200:
        print("❌ Failed to fetch data from API")
        return 0

    data = response.json()
    inserted = 0

    for item in data.get("results", []):
        try:
            name = item.get("name", "Unknown")
            features = item.get("features")
            lat = item.get("geo_point_2d", {}).get("lat")
            lon = item.get("geo_point_2d", {}).get("lon")
            geo_shape = item.get("geo_shape")

            playground = Playground(
                name=name,
                city="Melbourne",
                description="Imported from API",
                features=features,
                lat=lat,
                lon=lon,
                geo_shape=geo_shape
            )

            db.session.add(playground)
            inserted += 1
        except Exception as e:
            print(f"⚠️ Error processing record: {e}")
            continue

    db.session.commit()
    print(f"✅ Successfully inserted {inserted} records from API")
    return inserted


@main.route('/test-insert')
def test_insert():
    new_pg = Playground(
        name="Happy Park",
        city="Melbourne",
        description="A fun playground for all ages."
    )
    db.session.add(new_pg)
    db.session.commit()
    return "✅ Inserted sample playground!"

@main.route('/test-read')
def test_read():
    result = Playground.query.first()
    if result:
        return jsonify({
            "id": result.id,
            "name": result.name,
            "city": result.city,
            "description": result.description
        })
    return "⚠️ No records found."

@main.route('/test-api')
def test_api():
    url = "https://data.melbourne.vic.gov.au/api/explore/v2.1/catalog/datasets/playgrounds/records?limit=20"
    response = requests.get(url)

    if response.status_code == 200:
        return response.json()
    else:
        return {"error": f"API failed: {response.status_code}"}

@main.route('/load-playgrounds', methods=['GET'])
def load_playgrounds():
    inserted = fetch_and_insert_playgrounds()
    return f"✅ Successfully inserted {inserted} records!"
