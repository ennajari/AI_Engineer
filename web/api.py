import os
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Ajouter le répertoire parent au chemin pour importer le module chatbot
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from chatbot.chatbot_logic import PortfolioChatbot

# Charger les variables d'environnement
load_dotenv()

app = Flask(__name__)

# Permet les requêtes cross-origin depuis le domaine de votre frontend (ex: votre portfolio sur Railway)
CORS(app, origins=["https://vigilant-motivation-production.up.railway.app"])  # Update to the correct frontend URL if needed

# Initialiser le chatbot
api_key = os.getenv("GOOGLE_API_KEY", "")
chatbot = PortfolioChatbot(google_api_key=api_key)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    if not data or 'message' not in data:
        return jsonify({'error': 'Aucun message fourni'}), 400
    
    try:
        # Récupérer la réponse du chatbot
        response, _ = chatbot.get_answer(data['message'])
        return jsonify({'response': response})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Listen on all available IP addresses, which is required for public access
    app.run(debug=True, host='0.0.0.0', port=5000)
