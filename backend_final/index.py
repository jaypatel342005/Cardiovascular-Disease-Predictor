import os
import pickle
import logging
from contextlib import asynccontextmanager
import pandas as pd
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# --- Configuration ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

MODEL_PATH = 'cardio_model_week3.pkl'
model_data = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load model on startup
    global model_data
    if os.path.exists(MODEL_PATH):
        try:
            with open(MODEL_PATH, 'rb') as f:
                model_data = pickle.load(f)
            logger.info("Model and Scaler loaded successfully.")
        except Exception as e:
            logger.error(f"Error loading model: {e}")
            model_data = {}
    else:
        logger.error(f"Model file not found at {MODEL_PATH}")
        model_data = {}
    yield
    # Clean up resources if needed
    model_data.clear()

app = FastAPI(lifespan=lifespan)

# Allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models ---
class CardioInput(BaseModel):
    gender: str = Field(default="female")
    height: float = Field(default=165.0)
    weight: float = Field(default=70.0)
    ap_hi: float = Field(default=120.0)
    ap_lo: float = Field(default=80.0)
    cholesterol: int = Field(default=1)
    gluc: int = Field(default=1)
    smoke: int = Field(default=0)
    alco: int = Field(default=0)
    active: int = Field(default=1)
    age: float = Field(default=30.0)

# --- Helper Functions ---
def preprocess_input(data: CardioInput, scaler=None):
    """
    Preprocess input Pydantic model to match model features:
    ['gender', 'height', 'weight', 'ap_hi', 'ap_lo', 'cholesterol', 'gluc', 'smoke', 'alco', 'active', 'age_years', 'bmi', 'MAP']
    """
    gender_map = {'female': 1, 'male': 2}
    gender_input = data.gender.lower()
    gender = gender_map.get(gender_input, 1) 

    height = data.height
    weight = data.weight
    ap_hi = data.ap_hi
    ap_lo = data.ap_lo
    cholesterol = data.cholesterol
    gluc = data.gluc
    smoke = data.smoke
    alco = data.alco
    active = data.active
    age_years = data.age

    height_m = height / 100.0
    bmi = weight / (height_m ** 2) if height_m > 0 else 0

    map_val = (ap_hi + 2 * ap_lo) / 3.0

    features = {
        'gender': [gender],
        'height': [height],
        'weight': [weight],
        'ap_hi': [ap_hi],
        'ap_lo': [ap_lo],
        'cholesterol': [cholesterol],
        'gluc': [gluc],
        'smoke': [smoke],
        'alco': [alco],
        'active': [active],
        'age_years': [age_years],
        'bmi': [bmi],
        'MAP': [map_val]
    }
    
    df = pd.DataFrame(features)
    
    if scaler:
        return scaler.transform(df)
    return df.values

def generate_health_tips(data: CardioInput):
    """Generates personalized health tips based on input data."""
    tips = []
    
    # Blood Pressure
    if data.ap_hi > 130:
        tips.append("Your systolic blood pressure is elevated. Consider following the DASH diet and reducing sodium intake.")
    
    # BMI
    height_m = data.height / 100.0
    bmi = data.weight / (height_m ** 2) if height_m > 0 else 0
    if bmi > 25:
        tips.append("Your BMI indicates you may be overweight. Incorporating 30 minutes of daily exercise can help.")
        
    # Cholesterol
    if data.cholesterol > 1:
        tips.append("Cholesterol levels seem high. Avoid trans fats and increase soluble fiber (oats, fruits).")
        
    # Smoking
    if data.smoke == 1:
        tips.append("Smoking significantly increases cardiovascular risk. Seek support to quit.")
        
    # Activity
    if data.active == 0:
        tips.append("Detailed analysis suggests increasing physical activity. Try brisk walking for 20 mins a day.")
        
    if not tips:
        tips.append("Great job! Maintain your healthy lifestyle.")
        
    return tips

# --- Routes ---

@app.get("/")
def index():
    return "Backend is Running! Use /api/predict to score data."

@app.get("/api/health")
def health():
    return {"status": "healthy", "model_loaded": 'model' in model_data}

@app.post("/api/predict")
def predict(input_data: CardioInput):
    if 'model' not in model_data:
        logger.error("Predict called but model is not loaded.")
        raise HTTPException(status_code=500, detail="Model not loaded")

    try:
        logger.info(f"Received prediction request")
        
        scaler = model_data.get('scaler')
        X_scaled = preprocess_input(input_data, scaler)
        
        # model predict expects 2D array
        probs = model_data['model'].predict_proba(X_scaled)[0]
        prediction = model_data['model'].predict(X_scaled)[0]
        
        risk_probability = float(probs[1]) 
        risk_level = "High" if risk_probability > 0.5 else "Low"
        
        tips = generate_health_tips(input_data)

        result = {
            "prediction": int(prediction),
            "probability": risk_probability,
            "risk_level": risk_level,
            "tips": tips
        }
        
        logger.info(f"Prediction success: {risk_level} (Prob: {risk_probability:.2f})")
        return result

    except Exception as e:
        logger.error(f"Prediction Error: {e}", exc_info=True)
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get('PORT', 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)