import os
import sys
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv

# Add parent directory to path to import chatbot module
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from chatbot.chatbot_logic import PortfolioChatbot

# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder='../') # Serve static files from parent directory

# Enable CORS with debugging options
CORS(app, 
    origins=["*", "http://localhost", "http://127.0.0.1", "file://"], 
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"],
    expose_headers=["Content-Type"],
    methods=["GET", "POST", "OPTIONS"]
)

# Initialize chatbot
api_key = os.getenv("GOOGLE_API_KEY", "")
chatbot = None

# Try to initialize chatbot or handle errors gracefully
try:
    chatbot = PortfolioChatbot(google_api_key=api_key)
    print("Chatbot initialized successfully!")
except Exception as e:
    print(f"Error initializing chatbot: {str(e)}")

@app.route('/api/chat', methods=['POST', 'OPTIONS'])
def chat():
    # Handle CORS preflight requests
    if request.method == 'OPTIONS':
        return '', 204
        
    # Debug info
    print(f"Request received from: {request.remote_addr}")
    print(f"Request headers: {request.headers}")
    
    # Process actual request
    try:
        data = request.json
        if not data or 'message' not in data:
            return jsonify({'error': 'No message provided'}), 400
        
        if chatbot is None:
            return jsonify({'error': 'Chatbot not initialized properly'}), 500
            
        print(f"Processing message: {data['message']}")
        response, _ = chatbot.get_answer(data['message'])
        print(f"Response generated: {response[:50]}...")  # Print first 50 chars
        
        return jsonify({'response': response})
    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return jsonify({'error': str(e)}), 500

# Test endpoint to verify API is working
@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({'status': 'ok', 'message': 'API is working!'})

# Serve index.html at the root path
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path == "" or path == "index.html":
        return send_from_directory('../', 'index.html')
    return send_from_directory('../', path)

if __name__ == '__main__':
    # Use the PORT environment variable provided by Railway or default to 5000
    port = int(os.environ.get('PORT', 5000))
    # Print startup information
    print(f"Starting server on port {port}")
    print(f"API will be available at http://localhost:{port}/api/chat")
    print(f"Test endpoint available at http://localhost:{port}/api/test")
    
    # Bind to 0.0.0.0 to make accessible from outside the container
    app.run(host='0.0.0.0', debug=True, port=port)