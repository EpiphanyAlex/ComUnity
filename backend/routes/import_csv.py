import csv, os
from flask import Blueprint
from app.models.models import db, MelFeature

csv_import = Blueprint('csv_import', __name__)

@csv_import.route('/import-csv', methods=['GET'])
def import_csv_data():
    filepath = os.path.join(os.path.dirname(__file__), 'data.csv')
      # Update path if different

    inserted = 0
    with open(filepath, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            try:
                theme = row['theme']
                sub_theme = row['sub_theme']
                feature_name = row['feature_name']
                lat, lon = map(float, row['co_ordinates'].split(','))

                feature = MelFeature(
                    theme=theme,
                    sub_theme=sub_theme,
                    feature_name=feature_name,
                    latitude=lat,
                    longitude=lon
                )
                db.session.add(feature)
                inserted += 1
            except Exception as e:
                print(f"⚠️ Skipping row due to error: {e}")
                continue

    db.session.commit()
    return f"✅ Inserted {inserted} records into MelFeature!"
