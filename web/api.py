# api.py
from flask import Blueprint, request, jsonify
from chatbot.chatbot_logic import PortfolioChatbot
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

api = Blueprint('api', __name__)

# Initialize chatbot instance
api_key = os.getenv("GOOGLE_API_KEY", "")
chatbot = None

try:
    chatbot = PortfolioChatbot(google_api_key=api_key)
    print("Chatbot initialized successfully!")
except Exception as e:
    print(f"Error initializing chatbot: {str(e)}")

@api.route('/chat', methods=['POST', 'OPTIONS'])
def chat():
    if request.method == 'OPTIONS':
        return '', 204  # Handle CORS preflight

    try:
        data = request.json
        if not data or 'message' not in data:
            return jsonify({'error': 'No message provided'}), 400

        if chatbot is None:
            return jsonify({'error': 'Chatbot not initialized properly'}), 500

        print(f"Processing message: {data['message']}")
        response, _ = chatbot.get_answer(data['message'])
        print(f"Response generated: {response[:50]}...")

        return jsonify({'response': response})
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return jsonify({'error': str(e)}), 500

@api.route('/test', methods=['GET'])
def test():
    return jsonify({'status': 'ok', 'message': 'API is working!'})
