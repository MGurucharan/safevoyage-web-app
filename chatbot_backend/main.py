from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.chatbot import router as chatbot_router
from contextlib import asynccontextmanager
import logging
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())  # ✅ robust to any folder you run from


# Optional logging setup
logging.basicConfig(level=logging.INFO)

# Define FastAPI lifespan context
@asynccontextmanager
async def lifespan(app: FastAPI):
    logging.info("🚀 Application startup complete.")
    yield
    logging.info("🛑 Application shutdown complete.")

# Initialize FastAPI app
app = FastAPI(
    title="Smart Tourist Safety Chatbot",
    description="Backend for AI-powered multilingual tourist chatbot with safety and emergency capabilities.",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS (configure origin properly for production!)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ⚠️ Replace with frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(chatbot_router, prefix="/api/chatbot", tags=["Chatbot"])

# Health check endpoint
@app.get("/", tags=["Root"])
async def root():
    return {"message": "✅ Smart Tourist Safety Chatbot backend is running"}
