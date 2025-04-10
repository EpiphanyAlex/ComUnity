from flask import Flask
from flask_cors import CORS
import os
from models.models import db, Playground, MelFeature
from config.db_config import SQLALCHEMY_DATABASE_URI
from routes.chat import chat_bp
from routes.main import main
from routes.import_csv import csv_import


def create_app():
    app = Flask(__name__)
    CORS(app, origins=[
        "https://comunityconnect.netlify.app",  # Your production Netlify app
        "http://localhost:3000",                # Local development (React default)
        "http://127.0.0.1:3000",                # Alternative local address
    ])
    
    # Configure database
    app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize database
    db.init_app(app)
    
    # Register blueprints
    app.register_blueprint(chat_bp)
    app.register_blueprint(main)
    app.register_blueprint(csv_import)
    
    # Create database tables
    try:
        with app.app_context():
            db.create_all()
            print("Database tables created successfully")
    except Exception as e:
        print(f"Could not connect to database: {e}")
        print("Application will run, but database features won't work")
    
    return app

app = create_app()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True) 