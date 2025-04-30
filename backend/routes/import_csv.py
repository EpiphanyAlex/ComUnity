from flask import Blueprint, request, jsonify
from backend.models.models import db, Playground
import pandas as pd
import io

csv_import = Blueprint('csv_import', __name__)

@csv_import.route('/import-csv', methods=['POST'])
def import_playground_csv():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if not file.filename.endswith('.csv'):
        return jsonify({'error': 'File must be a CSV'}), 400
    
    try:
        # Read the uploaded file
        stream = io.StringIO(file.stream.read().decode("UTF8"), newline=None)
        csv_data = pd.read_csv(stream)
        
        # Process the CSV data
        for _, row in csv_data.iterrows():
            playground = Playground(
                name=row.get('name'),
                latitude=row.get('latitude'),
                longitude=row.get('longitude'),
                address=row.get('address', '')
            )
            db.session.add(playground)
        
        db.session.commit()
        return jsonify({'message': f'Successfully imported {len(csv_data)} playgrounds'}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500 