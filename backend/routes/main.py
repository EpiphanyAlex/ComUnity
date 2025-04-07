from flask import Blueprint, jsonify, request
from models.models import db, Playground, MelFeature

main = Blueprint('main', __name__)

@main.route('/playgrounds', methods=['GET'])
def get_playgrounds():
    playgrounds = Playground.query.all()
    result = []
    for playground in playgrounds:
        result.append({
            'id': playground.id,
            'name': playground.name,
            'description': playground.description,
            'location': playground.location,
            'latitude': playground.latitude,
            'longitude': playground.longitude
        })
    return jsonify(result)

@main.route('/playgrounds/<int:id>', methods=['GET'])
def get_playground(id):
    playground = Playground.query.get_or_404(id)
    return jsonify({
        'id': playground.id,
        'name': playground.name,
        'description': playground.description,
        'location': playground.location,
        'latitude': playground.latitude,
        'longitude': playground.longitude
    })

@main.route('/playgrounds', methods=['POST'])
def create_playground():
    data = request.json
    new_playground = Playground(
        name=data['name'],
        description=data.get('description'),
        location=data.get('location'),
        latitude=data.get('latitude'),
        longitude=data.get('longitude')
    )
    db.session.add(new_playground)
    db.session.commit()
    return jsonify({
        'id': new_playground.id,
        'name': new_playground.name,
        'description': new_playground.description,
        'location': new_playground.location,
        'latitude': new_playground.latitude,
        'longitude': new_playground.longitude
    }), 201 