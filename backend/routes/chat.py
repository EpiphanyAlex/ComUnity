from flask import Blueprint, request, jsonify, session
from openai import OpenAI
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Create a Blueprint for chat routes
chat_bp = Blueprint('chat', __name__)

# OpenAI API key
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

# System message for the chatbot
SYSTEM_MESSAGE = """You are a Melbourne Community Connections Helper, designed for youth aged 12-18. 
Your goals are to:
1. provide information about local events, resources and opportunities in Melbourne
2. encourage community engagement and social connection
3. recommend local activities for teens
4. provide advice and resources for coping with social isolation
5. respond in a friendly, supportive manner, appropriate to the youth's language style
6. refrain from discussing topics that are inappropriate for minors"""

# Store conversation history in memory (this is a simple implementation, for production use a database)
conversation_history = {}

@chat_bp.route('/api/chat', methods=['POST'])
def chat():
    try:
        # Get user message and conversation ID from request
        data = request.json
        user_message = data.get('message', '')
        conversation_id = data.get('conversationId', 'default')
        
        if not user_message:
            return jsonify({'error': 'No message provided'}), 400
        
        # Initialize conversation history if it doesn't exist
        if conversation_id not in conversation_history:
            conversation_history[conversation_id] = [
                {"role": "system", "content": SYSTEM_MESSAGE}
            ]
        
        # Add user message to conversation history
        conversation_history[conversation_id].append({"role": "user", "content": user_message})
        
        # Create a chat completion using the OpenAI API with the full conversation history
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=conversation_history[conversation_id],
            max_tokens=1024
        )
        
        # Extract the assistant's message from the response
        assistant_message = response.choices[0].message.content
        
        # Add assistant response to conversation history
        conversation_history[conversation_id].append({"role": "assistant", "content": assistant_message})
        
        # Limit conversation history to prevent token limits (keep last 10 messages)
        if len(conversation_history[conversation_id]) > 11:  # system message + 10 conversation turns
            conversation_history[conversation_id] = [conversation_history[conversation_id][0]] + conversation_history[conversation_id][-10:]
        
        return jsonify({"response": assistant_message, "conversationId": conversation_id})
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500 