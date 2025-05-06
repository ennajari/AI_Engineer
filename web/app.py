# app.py
import os
from flask import Flask, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
from api import api  # Import API blueprint

# Load environment variables
load_dotenv()

app = Flask(__name__, static_folder='../')  # Pour servir index.html
CORS(app, 
    origins=["*", "http://localhost", "http://127.0.0.1", "file://"],
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"],
    expose_headers=["Content-Type"],
    methods=["GET", "POST", "OPTIONS"]
)

# Register API routes
app.register_blueprint(api, url_prefix='/api')

# Serve frontend static files (index.html, JS, CSS, etc.)
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path == "" or path == "index.html":
        return send_from_directory('../', 'index.html')
    return send_from_directory('../', path)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"Starting server on port {port}")
    app.run(host='0.0.0.0', debug=True, port=port)
