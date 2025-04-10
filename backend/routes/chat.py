from flask import Blueprint, request, jsonify
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

@chat_bp.route('/api/chat', methods=['POST'])
def chat():
    """
    Main endpoint for the chat API that interfaces with the frontend.
    Receives user messages and returns AI responses.
    """
    try:
        # Get data from request
        data = request.json
        
        # Check if messages format is provided (array of message objects)
        if 'messages' in data:
            messages = data.get('messages', [])
            
            # Ensure system message is included if not already present
            if not any(msg.get('role') == 'system' for msg in messages):
                messages.insert(0, {"role": "system", "content": SYSTEM_MESSAGE})
        
        # Check if simple message format is provided (single message + conversationId)
        elif 'message' in data:
            user_message = data.get('message', '')
            conversation_id = data.get('conversationId', 'default')
            
            if not user_message:
                return jsonify({'error': 'No message provided'}), 400
                
            # Create messages array with system message and user message
            messages = [
                {"role": "system", "content": SYSTEM_MESSAGE},
                {"role": "user", "content": user_message}
            ]
        else:
            return jsonify({'error': 'No messages provided'}), 400
        
        # Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # Using gpt-4o-mini model as specified
            messages=messages,
            max_tokens=1000,
            temperature=0.7,
        )
        
        # Extract the assistant's message from the response
        assistant_message = response.choices[0].message.content
        
        # Return standardized response format
        return jsonify({
            "response": assistant_message,  # For backward compatibility
            "reply": assistant_message,     # New format
            "usage": {
                "prompt_tokens": response.usage.prompt_tokens,
                "completion_tokens": response.usage.completion_tokens,
                "total_tokens": response.usage.total_tokens
            }
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@chat_bp.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint to verify the API is running"""
    return jsonify({"status": "healthy"}) 