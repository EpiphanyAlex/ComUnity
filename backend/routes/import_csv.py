from flask import Blueprint, request, jsonify
import pandas as pd
from models.models import db, Playground
import io

csv_import = Blueprint('csv_import', __name__)

@csv_import.route('/import/playgrounds', methods=['POST'])
def import_playgrounds():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and file.filename.endswith('.csv'):
        try:
            stream = io.StringIO(file.stream.read().decode("UTF8"), newline=None)
            df = pd.read_csv(stream)
            
            # Assuming CSV has columns: name, description, location, latitude, longitude
            for _, row in df.iterrows():
                playground = Playground(
                    name=row['name'],
                    description=row.get('description', None),
                    location=row.get('location', None),
                    latitude=row.get('latitude', None),
                    longitude=row.get('longitude', None)
                )
                db.session.add(playground)
            
            db.session.commit()
            return jsonify({'message': f'Successfully imported {len(df)} playgrounds'}), 201
        
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    
    return jsonify({'error': 'File must be a CSV'}), 400 