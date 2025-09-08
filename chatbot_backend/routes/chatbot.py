from fastapi import APIRouter
from models.user_queries import UserQuery
from services.langchain_agent import get_chat_response
from services.intent_classifier import classify_intent

router = APIRouter()

@router.post("/")
async def handle_chat(user_query: UserQuery):
    intent, confidence = classify_intent(user_query.query)
    response = await get_chat_response(user_query.query, user_query.user_id, intent)
    return {
        "response": response,
        "intent": intent,
        "confidence": confidence
    }
