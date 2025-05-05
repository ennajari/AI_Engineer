import os
from typing import List
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_community.vectorstores import FAISS
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document

load_dotenv()

class RAGPipeline:
    def __init__(self, docs_dir: str = "chatbot/docs", vectorstore_path: str = "chatbot/vectorstore"):
        self.docs_dir = docs_dir
        self.vectorstore_path = vectorstore_path

        self.embeddings = GoogleGenerativeAIEmbeddings(
            model="models/embedding-001",
            google_api_key=os.getenv("GOOGLE_API_KEY")
        )

        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )

        os.makedirs(vectorstore_path, exist_ok=True)

    def load_documents(self) -> List[Document]:
        docs = []
        for filename in os.listdir(self.docs_dir):
            path = os.path.join(self.docs_dir, filename)
            if filename.endswith(".pdf"):
                loader = PyPDFLoader(path)
            else:
                loader = TextLoader(path, encoding='utf-8')
            docs.extend(loader.load())
        return docs

    def build_vectorstore(self) -> bool:
        try:
            raw_docs = self.load_documents()
            chunks = self.text_splitter.split_documents(raw_docs)
            vectorstore = FAISS.from_documents(chunks, self.embeddings)
            vectorstore.save_local(self.vectorstore_path)
            return True
        except Exception as e:
            print("Erreur:", e)
            return False
