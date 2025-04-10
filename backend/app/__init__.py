from flask import Flask
from .models.models import db, Playground, MelFeature
from config.db_config import SQLALCHEMY_DATABASE_URI
from routes.main import main
from routes.import_csv import csv_import  
from routes.test2 import query


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    
    with app.app_context():
        db.create_all()
    app.register_blueprint(query)
    return app

