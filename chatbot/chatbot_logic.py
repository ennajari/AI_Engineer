import os
from dotenv import load_dotenv
from langchain.chains import RetrievalQA
from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from chatbot.rag_pipeline import RAGPipeline

load_dotenv()

class PortfolioChatbot:
    def __init__(self, google_api_key=None):
        self.api_key = google_api_key or os.getenv("GOOGLE_API_KEY")
        self.vectorstore_path = "chatbot/vectorstore"
        self._load_vectorstore()

    def _load_vectorstore(self):
        embeddings = GoogleGenerativeAIEmbeddings(
            model="models/embedding-001",
            google_api_key=self.api_key
        )
        self.vectorstore = FAISS.load_local(
            self.vectorstore_path, embeddings, allow_dangerous_deserialization=True
        )

        self.llm = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            google_api_key=self.api_key,
            temperature=0.3
        )

        self.qa_chain = RetrievalQA.from_chain_type(
            llm=self.llm,
            retriever=self.vectorstore.as_retriever()
        )

    def get_answer(self, query: str):
        result = self.qa_chain({"query": query})
        return result["result"], []

    def reset_conversation(self):
        pass  # Gemini ne gère pas l'historique côté client dans cette config

    def update_knowledge_base(self) -> bool:
        pipeline = RAGPipeline(openai_api_key=self.api_key)
        return pipeline.build_vectorstore()
