# app.py
import json
import math
from flask import Flask, jsonify, request
from flask_cors import CORS   # ✅ 新加这一行
from config import Config
from models import db, Event

app = Flask(__name__)
CORS(app)  # ✅ 这里一行代码，全局支持跨域了！

# 配置数据库
app.config['SQLALCHEMY_DATABASE_URI'] = Config.SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = Config.SQLALCHEMY_TRACK_MODIFICATIONS

db.init_app(app)

# 查询所有events
@app.route('/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    if not events:
        # ✅ 如果数据库没数据，返回本地 eventlist.json
        with open('eventlist.json', 'r', encoding='utf-8') as f:
            backup_data = json.load(f)
        return jsonify(backup_data)
    else:
        return jsonify({"eventList": [event.to_dict() for event in events]})

# 根据ID查询event
@app.route('/events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    event = Event.query.get(event_id)
    if event is None:
        return jsonify({'error': 'Event not found'}), 404
    return jsonify(event.to_dict())

@app.route('/events/within', methods=['GET'])
def get_events_within_bounds():
    try:
        min_lat = float(request.args.get('min_lat'))
        max_lat = float(request.args.get('max_lat'))
        min_lng = float(request.args.get('min_lng'))
        max_lng = float(request.args.get('max_lng'))
    except (TypeError, ValueError):
        return jsonify({'error': 'Invalid or missing parameters'}), 400

    events = Event.query.filter(
        Event.latitude >= min_lat,
        Event.latitude <= max_lat,
        Event.longitude >= min_lng,
        Event.longitude <= max_lng
    ).all()

    return jsonify({
        "eventList": [event.to_dict() for event in events]
    })

# http://127.0.0.1:5000/events/nearby?lat=-37.8136&lng=144.9631
@app.route('/events/nearby', methods=['GET'])
def get_events_nearby():
    try:
        lat = float(request.args.get('lat'))
        lng = float(request.args.get('lng'))
    except (TypeError, ValueError):
        return jsonify({'error': 'Missing or invalid lat/lng'}), 400

    # 5公里的近似偏移值（适用于墨尔本）
    lat_range = 0.045
    lng_range = 0.056

    min_lat = lat - lat_range
    max_lat = lat + lat_range
    min_lng = lng - lng_range
    max_lng = lng + lng_range

    # 快速范围查询
    events = Event.query.filter(
        Event.latitude >= min_lat,
        Event.latitude <= max_lat,
        Event.longitude >= min_lng,
        Event.longitude <= max_lng
    ).all()

    return jsonify({
        "eventList": [event.to_dict() for event in events]
    })

if __name__ == '__main__':
    app.run(debug=True)