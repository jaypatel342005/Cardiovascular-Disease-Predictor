import os
import pickle
import logging
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Union, Any, List, Dict

# --- Configuration ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = FastAPI(title="Cardio Disease Prediction API")

# Allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Helper Functions ---
def preprocess_input(data, scaler=None):
    """
    Preprocess input dictionary to match model features:
    ['gender', 'height', 'weight', 'ap_hi', 'ap_lo', 'cholesterol', 'gluc', 'smoke', 'alco', 'active', 'age_years', 'bmi', 'MAP']
    """
    gender_map = {'female': 1, 'male': 2}
    gender_input = str(data.get('gender', '')).lower()
    gender = gender_map.get(gender_input, 1) 

    height = float(data.get('height', 165))
    weight = float(data.get('weight', 70))
    ap_hi = float(data.get('ap_hi', 120))
    ap_lo = float(data.get('ap_lo', 80))
    cholesterol = int(data.get('cholesterol', 1))
    gluc = int(data.get('gluc', 1))
    smoke = int(data.get('smoke', 0))
    alco = int(data.get('alco', 0))
    active = int(data.get('active', 1))
    age_years = float(data.get('age', 30))

    height_m = height / 100.0
    bmi = weight / (height_m ** 2)

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

def generate_health_tips(data):
    """Generates personalized health tips based on input data."""
    tips = []
    
    # Blood Pressure
    ap_hi = float(data.get('ap_hi', 120))
    if ap_hi > 130:
        tips.append("Your systolic blood pressure is elevated. Consider following the DASH diet and reducing sodium intake.")
    
    # BMI
    height = float(data.get('height', 165)) / 100
    weight = float(data.get('weight', 70))
    bmi = weight / (height**2)
    if bmi > 25:
        tips.append("Your BMI indicates you may be overweight. Incorporating 30 minutes of daily exercise can help.")
        
    # Cholesterol
    chol = int(data.get('cholesterol', 1))
    if chol > 1:
        tips.append("Cholesterol levels seem high. Avoid trans fats and increase soluble fiber (oats, fruits).")
        
    # Smoking
    if int(data.get('smoke', 0)) == 1:
        tips.append("Smoking significantly increases cardiovascular risk. Seek support to quit.")
        
    # Activity
    if int(data.get('active', 1)) == 0:
        tips.append("Detailed analysis suggests increasing physical activity. Try brisk walking for 20 mins a day.")
        
    if not tips:
        tips.append("Great job! Maintain your healthy lifestyle.")
        
    return tips

# --- Model Loading ---
MODEL_PATH = 'cardio_model_week3.pkl'
model_data = {}

def load_model():
    """Loads the model and scaler from disk."""
    global model_data
    if os.path.exists(MODEL_PATH):
        try:
            with open(MODEL_PATH, 'rb') as f:
                model_data = pickle.load(f)
            logger.info("Model and Scaler loaded successfully.")
        except Exception as e:
            logger.error(f"Error loading model: {e}")
    else:
        logger.error(f"Model file not found at {MODEL_PATH}")

# Load model on startup
load_model()

# --- Pydantic Models ---
class PatientData(BaseModel):
    name: Optional[str] = None
    dob: Optional[str] = None
    gender: Union[str, int]
    age: Union[int, float]
    height: float
    weight: float
    ap_hi: float
    ap_lo: float
    cholesterol: int
    gluc: int
    smoke: int
    alco: int
    active: int

class PredictionResponse(BaseModel):
    prediction: int
    probability: float
    risk_level: str
    tips: List[str]

# --- Routes ---

@app.get("/")
def index():
    return "Backend is Running! Use /api/predict to score data."

@app.get("/api/health")
def health():
    return {"status": "healthy", "model_loaded": 'model' in model_data}

@app.post("/api/predict", response_model=PredictionResponse)
def predict(data: PatientData):
    if 'model' not in model_data:
        logger.error("Predict called but model is not loaded.")
        raise HTTPException(status_code=500, detail="Model not loaded")

    try:
        logger.info(f"Received prediction request")
        
        # Convert Pydantic model to dict for utils processing
        input_data = data.dict()
        
        # Preprocessing
        scaler = model_data.get('scaler')
        X_scaled = preprocess_input(input_data, scaler)
        
        # Prediction
        probs = model_data['model'].predict_proba(X_scaled)[0]
        prediction = model_data['model'].predict(X_scaled)[0]
        
        risk_probability = float(probs[1]) 
        risk_level = "High" if risk_probability > 0.5 else "Low"
        
        # Health Tips
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

if __name__ == '__main__':
    import uvicorn
    port = int(os.environ.get('PORT', 8080))
    uvicorn.run(app, host='0.0.0.0', port=port)
