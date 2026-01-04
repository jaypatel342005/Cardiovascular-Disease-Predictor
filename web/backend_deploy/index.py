import os
import pickle
import logging
import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

# --- Configuration ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app) # Allow all origins

# --- Model Loading Logic ---
# FIX: Use absolute path to ensure Vercel finds the model file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'cardio_model_week3.pkl')

model_data = {}

def load_model():
    """Loads the model and scaler from disk."""
    global model_data
    if os.path.exists(MODEL_PATH):
        try:
            with open(MODEL_PATH, 'rb') as f:
                model_data = pickle.load(f)
            logger.info(f"Model loaded successfully from {MODEL_PATH}")
        except Exception as e:
            logger.error(f"Error loading model: {e}")
            model_data = {} # Ensure it's defined even on error
    else:
        logger.error(f"Model file not found at {MODEL_PATH}")

# Load model immediately when app starts
load_model()

def preprocess_input(data, scaler=None):
    """
    Preprocess input dictionary to match model features.
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

    # Derived features
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
    """Generates personalized health tips."""
    tips = []
    ap_hi = float(data.get('ap_hi', 120))
    if ap_hi > 130:
        tips.append("Your systolic blood pressure is elevated. Consider following the DASH diet.")
    
    height = float(data.get('height', 165)) / 100
    weight = float(data.get('weight', 70))
    bmi = weight / (height**2)
    if bmi > 25:
        tips.append("Your BMI indicates you may be overweight. 30 mins of daily exercise can help.")
        
    chol = int(data.get('cholesterol', 1))
    if chol > 1:
        tips.append("Cholesterol levels seem high. Avoid trans fats.")
        
    if int(data.get('smoke', 0)) == 1:
        tips.append("Smoking significantly increases cardiovascular risk.")
        
    if int(data.get('active', 1)) == 0:
        tips.append("Try to increase physical activity. Brisk walking for 20 mins a day helps.")
        
    if not tips:
        tips.append("Great job! Maintain your healthy lifestyle.")
        
    return tips

@app.route('/', methods=['GET'])
def index():
    return "Backend is Running! Use /api/predict to score data."

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "model_loaded": 'model' in model_data})

@app.route('/api/predict', methods=['POST'])
def predict():
    # Check if model key exists in the loaded dictionary
    if 'model' not in model_data:
        logger.error("Predict called but model is not loaded.")
        return jsonify({"error": "Model not loaded properly"}), 500

    try:
        data = request.json
        logger.info(f"Received prediction request")
        
        scaler = model_data.get('scaler')
        X_scaled = preprocess_input(data, scaler)
        
        # Ensure your pickle file was saved as a dict: {'model': clf, 'scaler': scaler}
        probs = model_data['model'].predict_proba(X_scaled)[0]
        prediction = model_data['model'].predict(X_scaled)[0]
        
        risk_probability = float(probs[1]) 
        risk_level = "High" if risk_probability > 0.5 else "Low"
        
        tips = generate_health_tips(data)

        result = {
            "prediction": int(prediction),
            "probability": risk_probability,
            "risk_level": risk_level,
            "tips": tips
        }
        
        return jsonify(result)

    except Exception as e:
        logger.error(f"Prediction Error: {e}", exc_info=True)
        return jsonify({"error": str(e)}), 400

# Vercel requires the app object to be available at module level
app = app