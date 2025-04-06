from flask import Blueprint, jsonify
from app.models.models import Playground, db
import requests


main = Blueprint('main', __name__)

@main.route('/test-insert')
def test_insert():
    # Insert a sample record
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
    # Read the first record
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
    url = "https://your.api.url/here"
    response = requests.get(url)

    if response.status_code == 200:
        return response.json()
    else:
        return {"error": f"API failed: {response.status_code}"}