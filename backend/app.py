from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from models.models import db, Playground, MelFeature
from config.db_config import SQLALCHEMY_DATABASE_URI
from routes.main import main
from routes.import_csv import csv_import
from openai import OpenAI
from dotenv import load_dotenv
import logging
from datetime import datetime

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("app.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# OpenAI API key
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

# System prompt for the chatbot
SYSTEM_PROMPT = """
You are a Melbourne Community Connections Helper, designed for youth aged 12-18. 
Your goals are to:
1. provide information about local events, resources and opportunities in Melbourne
2. encourage community engagement and social connection
3. recommend local activities for teens
4. provide advice and resources for coping with social isolation
5. respond in a friendly, supportive manner, appropriate to the youth's language style
6. refrain from discussing topics that are inappropriate for minors
"""

# Store conversation history (In a production environment, use a database)
conversation_history = {}

def create_app():
    # Initialize Flask app
    app = Flask(__name__)
    # CORS(app, origins=[
    #     "https://comunityconnect.netlify.app",  # Your production Netlify app
    #     "http://localhost:3000",                # Local development (React default)
    #     "http://127.0.0.1:3000",                # Alternative local address
    # ])

    CORS(app)   # Enable CORS for all routes
    
    # Configure database
    app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize database
    db.init_app(app)
    
    # Register blueprints
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
    
    # Chat API Endpoint
    @app.route('/api/chat', methods=['POST'])
    def chat():
        """
        Main endpoint for the chat API that interfaces with the frontend.
        Receives user messages and returns AI responses.
        """
        try:
            # Get data from request
            data = request.json
            user_message = data.get('message', '')
            session_id = data.get('session_id', data.get('conversationId', 'default'))
            
            logger.info(f"Received message from session {session_id}: {user_message}")
            
            # Initialize conversation history for new sessions
            if session_id not in conversation_history:
                conversation_history[session_id] = []
            
            # Prepare conversation for OpenAI
            messages = [
                {"role": "system", "content": SYSTEM_PROMPT}
            ]
            
            # Add conversation history
            for msg in conversation_history[session_id]:
                messages.append(msg)
            
            # Add the new user message
            messages.append({"role": "user", "content": user_message})
            
            # Call OpenAI API
            response = client.chat.completions.create(
                model="gpt-4o-mini",  # Using the latest model available
                messages=messages,
                max_tokens=1000,
                temperature=0.7,
            )
            
            # Extract assistant's response
            assistant_response = response.choices[0].message.content
            
            # Update conversation history
            conversation_history[session_id].append({"role": "user", "content": user_message})
            conversation_history[session_id].append({"role": "assistant", "content": assistant_response})
            
            # Limit conversation history length to prevent token limits
            if len(conversation_history[session_id]) > 10:
                conversation_history[session_id] = conversation_history[session_id][-10:]
            
            # Return standardized response format
            return jsonify({
                "response": assistant_response,
                "usage": {
                    "prompt_tokens": response.usage.prompt_tokens,
                    "completion_tokens": response.usage.completion_tokens,
                    "total_tokens": response.usage.total_tokens
                }
            })
        
        except Exception as e:
            logger.error(f"Error in chat endpoint: {str(e)}")
            return jsonify({"error": str(e)}), 500

    # Health check endpoint
    @app.route('/api/health', methods=['GET'])
    def health_check():
        """Health check endpoint to verify the API is running"""
        return jsonify({"status": "ok", "timestamp": datetime.now().isoformat()})
    
    return app

app = create_app()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True) 