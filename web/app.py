import os
import sys
import time
import streamlit as st
from dotenv import load_dotenv

# Ajouter le répertoire parent au chemin pour importer le module chatbot
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from chatbot.chatbot_logic import PortfolioChatbot

# Charger les variables d'environnement
load_dotenv()

# Configurer la page Streamlit
st.set_page_config(
    page_title="Portfolio Chatbot",
    page_icon="💬",
    layout="wide"
)

# Initialisation de l'état de session
if "chatbot" not in st.session_state:
    api_key = os.getenv("GOOGLE_API_KEY", "")
    st.session_state.chatbot = PortfolioChatbot(google_api_key=api_key)
    st.session_state.messages = []

# Barre latérale pour la configuration
with st.sidebar:
    st.title("⚙️ Configuration")
    google_api_key = st.text_input(
        "Google API Key",
        value=os.getenv("GOOGLE_API_KEY", ""),
        type="password",
        help="Entrez votre clé API Google Gemini pour utiliser le chatbot."
    )

    if google_api_key and google_api_key != os.getenv("GOOGLE_API_KEY", ""):
        # Sauvegarder dans session_state et recharger le chatbot
        st.session_state.google_api_key = google_api_key
        os.environ["GOOGLE_API_KEY"] = google_api_key
        with st.spinner("Réinitialisation du chatbot..."):
            st.session_state.chatbot = PortfolioChatbot(google_api_key=google_api_key)
            st.success("Chatbot réinitialisé !")

    st.divider()
    st.markdown("""
    Ce chatbot utilise Google Gemini (gemini-2.0-flash) et RAG 
    pour répondre aux questions sur le propriétaire du portfolio.
    """)

# Titre principal
st.title("💬 Assistant de Portfolio")

# Affichage des messages existants
for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

# Entrée de l'utilisateur
if prompt := st.chat_input("Posez une question sur mon profil, mes projets ou mes compétences..."):
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)

    # Génération de la réponse
    with st.chat_message("assistant"):
        placeholder = st.empty()
        full_text = ""
        for chunk in st.session_state.chatbot.get_answer(prompt)[0].split():
            full_text += chunk + " "
            placeholder.markdown(full_text + "▌")
            time.sleep(0.01)
        placeholder.markdown(full_text)
    
    # Ajouter la réponse à l'historique
    st.session_state.messages.append({"role": "assistant", "content": full_text})
