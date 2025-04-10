from flask import Blueprint, jsonify
from app.models.models import Playground, db

main = Blueprint('main', __name__)

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

query = Blueprint('query', __name__)

@query.route('/preview-melfeatures')
def preview_melfeatures():
    df = pd.read_sql_table('MelFeature', con=db.engine)
    return df.head().to_json()