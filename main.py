from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import joblib
import os
import re
import string

# ---------- App ----------
app = FastAPI(title="FakeJobGuard API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- Paths ----------
BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "model", "model.pkl")
VECTORIZER_PATH = os.path.join(BASE_DIR, "model", "vectorizer.pkl")

# ---------- Load Artifacts ----------
model = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)

# ---------- Text Cleaner (same logic as training) ----------
def clean_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r"\d+", "", text)
    text = text.translate(str.maketrans("", "", string.punctuation))
    text = re.sub(r"\s+", " ", text).strip()
    return text

# ---------- Request Schema ----------
class JobRequest(BaseModel):
    job_text: str

# ---------- Health Check ----------
@app.get("/")
def health():
    return {"status": "ok", "message": "Fake Job Detection API is running"}

# ---------- Prediction Endpoint ----------
@app.post("/predict")
def predict(req: JobRequest):
    cleaned = clean_text(req.job_text)
    X = vectorizer.transform([cleaned])

    prob_fake = float(model.predict_proba(X)[0][1])
    label = "Fake Job" if prob_fake >= 0.3 else "Real Job"

    return {
        "prediction": label,
        "confidence": round(prob_fake, 4)
    }
