from flask import Flask
from flask_cors import CORS
import os
from routes.chat import chat_bp
from routes.main import main
from routes.import_csv import csv_import
from models.models import db
from config.db_config import SQLALCHEMY_DATABASE_URI

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes
    
    # Database configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize database
    db.init_app(app)
    
    # Register blueprints
    app.register_blueprint(chat_bp)
    app.register_blueprint(main)
    app.register_blueprint(csv_import)
    
    # Create all database tables
    with app.app_context():
        db.create_all()
        
    return app

app = create_app()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True) 