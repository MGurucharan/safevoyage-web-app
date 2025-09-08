import streamlit as st
import requests

API_URL = "http://localhost:8000/api/chatbot/"  # Update this if hosted elsewhere

st.set_page_config(page_title="Smart Tourist Safety Chatbot", layout="centered")
st.title("🧭 Smart Tourist Safety Chatbot")
st.markdown("This assistant provides multilingual safety guidance for tourists.")

# Session state
if "chat_history" not in st.session_state:
    st.session_state.chat_history = []

if "user_id" not in st.session_state:
    st.session_state.user_id = "user_001"  # Replace with actual user ID logic if needed

# Chat input box
user_input = st.chat_input("Ask me about tourist safety, emergency help, or local info...")

# Handle user query
if user_input:
    payload = {
        "query": user_input,
        "user_id": st.session_state.user_id
    }
    try:
        response = requests.post(API_URL, json=payload)
        response.raise_for_status()
        data = response.json()

        # Add to history
        st.session_state.chat_history.append({
            "user": user_input,
            "bot": data["response"],
            "intent": data.get("intent", "N/A"),
            "confidence": round(data.get("confidence", 0.0), 2),
            "feedback": None
        })

    except Exception as e:
        st.error(f"⚠️ Failed to connect to chatbot API: {e}")

# Display chat history
for i, chat in enumerate(reversed(st.session_state.chat_history)):
    with st.chat_message("user"):
        st.write(chat["user"])
    with st.chat_message("assistant"):
        st.write(chat["bot"])
        st.caption(f"🤖 Intent: `{chat['intent']}` | Confidence: `{chat['confidence']}`")
        if chat["feedback"] is None:
            col1, col2 = st.columns([1, 1])
            with col1:
                if st.button("👍 Relevant", key=f"like_{i}"):
                    st.session_state.chat_history[-(i+1)]["feedback"] = "👍"
            with col2:
                if st.button("👎 Not Relevant", key=f"dislike_{i}"):
                    st.session_state.chat_history[-(i+1)]["feedback"] = "👎"
        else:
            st.markdown(f"**Your Feedback:** {chat['feedback']}")

# Optional: Clear chat history
st.sidebar.button("🗑️ Clear Chat", on_click=lambda: st.session_state.clear())
