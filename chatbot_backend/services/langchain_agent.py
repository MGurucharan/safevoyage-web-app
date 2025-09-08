# chatbot_backend/services/langchain_agent.py

import os
import traceback
from dotenv import load_dotenv
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain_community.vectorstores.faiss import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_huggingface import HuggingFaceEndpoint

# --- Load Environment Variables ---
load_dotenv()
HUGGINGFACEHUB_API_TOKEN = os.getenv("HUGGINGFACEHUB_API_TOKEN")
VECTOR_STORE_DIR = os.getenv("VECTOR_STORE_DIR", "vector_index")

if not HUGGINGFACEHUB_API_TOKEN:
    raise ValueError("❌ HUGGINGFACEHUB_API_TOKEN is not set in the environment.")

# --- Initialize LLM from Hugging Face ---
llm = HuggingFaceEndpoint(
    repo_id="tiiuae/falcon-7b-instruct",  # ✅ Model supports 'text-generation'
    task="text-generation",
    temperature=0.5,
    max_new_tokens=512,
    huggingfacehub_api_token=HUGGINGFACEHUB_API_TOKEN,
)

# --- Load Embeddings and Vector Store ---
index_path = os.path.join(VECTOR_STORE_DIR, "index.faiss")
if not os.path.exists(index_path):
    raise FileNotFoundError(f"❌ FAISS index not found at: {index_path}. Please generate it first.")

embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

vectordb = FAISS.load_local(
    VECTOR_STORE_DIR,
    embeddings=embeddings,
    allow_dangerous_deserialization=True,
)

retriever = vectordb.as_retriever(search_type="similarity", k=3)

# --- Conversation Memory & Retrieval Chain ---
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

chat_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=retriever,
    memory=memory,
    return_source_documents=False,
)

# --- Chatbot Interface ---
async def get_chat_response(query: str, user_id: str = "", intent: str = "") -> str:
    try:
        result = chat_chain.invoke({"question": query})
        return result["answer"]
    except Exception as e:
        traceback.print_exc()
        return f"⚠️ Error while processing your query: {str(e)}"
