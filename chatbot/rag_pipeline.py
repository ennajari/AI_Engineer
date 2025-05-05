import os
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv

load_dotenv()

class RAGPipeline:
    def __init__(self, google_api_key=None):
        self.api_key = google_api_key or os.getenv("GOOGLE_API_KEY")
        self.docs_path = "chatbot/docs/projets.txt"  # Chemin vers ton fichier de base de connaissances
        self.vectorstore_path = "chatbot/vectorstore"

    def build_vectorstore(self) -> bool:
        if not os.path.exists(self.docs_path):
            raise FileNotFoundError(f"[ERROR] Document non trouvé : {self.docs_path}")

        # 1. Charger le document
        loader = TextLoader(self.docs_path, encoding="utf-8")
        documents = loader.load()

        # 2. Diviser en petits chunks
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        docs = text_splitter.split_documents(documents)

        # 3. Générer les embeddings avec Gemini
        embeddings = GoogleGenerativeAIEmbeddings(
            model="models/embedding-001",
            google_api_key=self.api_key
        )

        # 4. Créer et sauvegarder le vectorstore
        vectorstore = FAISS.from_documents(docs, embeddings)
        vectorstore.save_local(self.vectorstore_path)

        print(f"[INFO] Vectorstore FAISS généré à : {self.vectorstore_path}")
        return True
