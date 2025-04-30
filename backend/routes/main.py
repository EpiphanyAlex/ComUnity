from flask import Blueprint, jsonify, request
from backend.models.models import db, Playground, MelFeature

main = Blueprint('main', __name__)

@main.route('/playgrounds', methods=['GET'])
def get_playgrounds():
    playgrounds = Playground.query.all()
    results = []
    for playground in playgrounds:
        results.append({
            'id': playground.id,
            'name': playground.name,
            'latitude': playground.latitude,
            'longitude': playground.longitude,
            'address': playground.address
        })
    return jsonify(results)

@main.route('/playground/<int:id>', methods=['GET'])
def get_playground(id):
    playground = Playground.query.get_or_404(id)
    return jsonify({
        'id': playground.id,
        'name': playground.name,
        'latitude': playground.latitude,
        'longitude': playground.longitude,
        'address': playground.address
    }) 