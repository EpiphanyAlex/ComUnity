from flask import Blueprint, jsonify
from ..config.db_config import SQLALCHEMY_DATABASE_URI
from sqlalchemy import create_engine, text

playgrounds_bp = Blueprint('playgrounds', __name__)
engine = create_engine(SQLALCHEMY_DATABASE_URI)

@playgrounds_bp.route('/api/playgrounds', methods=['GET'])
def get_playgrounds():
    try:
        with engine.connect() as conn:
            result = conn.execute(text(
                "SELECT id, name, lat AS latitude, lon AS longitude, features, description FROM playground"
            ))
            data = [dict(row._mapping) for row in result]
            print("✅ Loaded playground data:", data[:3])  # Print just the first 3
            return jsonify(data)
    except Exception as e:
        print(f"❌ Error in /api/playgrounds: {e}")
        return jsonify({"error": str(e)}), 500

@playgrounds_bp.route('/api/features', methods=['GET'])
def get_features():
    try:
        with engine.connect() as conn:
            result = conn.execute(text("SELECT id, theme, sub_theme, feature_name, latitude, longitude FROM mel_feature"))
            data = [dict(row._mapping) for row in result]  # safer mapping
            return jsonify(data)
    except Exception as e:
        print(f"❌ Error in /api/features: {e}")
        return jsonify({"error": str(e)}), 500
