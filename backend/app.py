from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from backend.models.models import db, Playground, MelFeature
from backend.config.db_config import SQLALCHEMY_DATABASE_URI
from backend.routes.chat import chat_bp
from backend.routes.main import main
from backend.routes.import_csv import csv_import
from backend.routes.playgrounds import playgrounds_bp
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

conversation_history = {}

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    app.register_blueprint(main)
    app.register_blueprint(csv_import)
    app.register_blueprint(playgrounds_bp)

    try:
        with app.app_context():
            db.create_all()
            print("✅ Database tables created successfully")
    except Exception as e:
        print(f"❌ Could not connect to database: {e}")

    @app.route('/api/chat', methods=['POST'])
    def chat():
        try:
            data = request.json
            user_message = data.get('message', '')
            session_id = data.get('session_id', data.get('conversationId', 'default'))

            logger.info(f"Received message from session {session_id}: {user_message}")

            if session_id not in conversation_history:
                conversation_history[session_id] = []

            messages = [{"role": "system", "content": SYSTEM_PROMPT}] + conversation_history[session_id]
            messages.append({"role": "user", "content": user_message})

            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
                max_tokens=1000,
                temperature=0.7,
            )

            assistant_response = response.choices[0].message.content

            conversation_history[session_id].append({"role": "user", "content": user_message})
            conversation_history[session_id].append({"role": "assistant", "content": assistant_response})

            if len(conversation_history[session_id]) > 10:
                conversation_history[session_id] = conversation_history[session_id][-10:]

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

    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({"status": "ok", "timestamp": datetime.now().isoformat()})

    return app

app = create_app()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
