from flask import Flask
from .models.models import db, Playground
from config.db_config import SQLALCHEMY_DATABASE_URI
from main import main, fetch_and_insert_playgrounds


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    app.register_blueprint(main)

    with app.app_context():
        db.create_all()
        fetch_and_insert_playgrounds()  # Auto-load playgrounds on startup

    return app
