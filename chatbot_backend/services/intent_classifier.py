from transformers import pipeline
from config import HUGGINGFACEHUB_API_TOKEN

classifier = pipeline(
    "zero-shot-classification",
    model="facebook/bart-large-mnli",
    token=HUGGINGFACEHUB_API_TOKEN
)

LABELS = [
    "panic", "location", "safety", "lost", "route", "risk", "emergency", "hotel info"
]

def classify_intent(text: str):
    result = classifier(text, candidate_labels=LABELS)
    return result["labels"][0], result["scores"][0]
