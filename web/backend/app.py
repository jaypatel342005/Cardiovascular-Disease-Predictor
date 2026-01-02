import os
import pickle
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import preprocess_input, generate_health_tips

# --- Configuration ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)
# Allow all origins matching /api/*
CORS(app)

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

load_model()

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "model_loaded": 'model' in model_data})

@app.route('/api/predict', methods=['POST'])
def predict():
    if 'model' not in model_data:
        logger.error("Predict called but model is not loaded.")
        return jsonify({"error": "Model not loaded"}), 500

    try:
        data = request.json
        logger.info(f"Received prediction request")
        
        # Preprocess logic moved to utils
        scaler = model_data.get('scaler')
        X_scaled = preprocess_input(data, scaler)
        
        # Prediction
        probs = model_data['model'].predict_proba(X_scaled)[0]
        prediction = model_data['model'].predict(X_scaled)[0]
        
        risk_probability = float(probs[1]) 
        risk_level = "High" if risk_probability > 0.5 else "Low"
        
        # Health Tips logic moved to utils
        tips = generate_health_tips(data)

        result = {
            "prediction": int(prediction),
            "probability": risk_probability,
            "risk_level": risk_level,
            "tips": tips
        }
        
        logger.info(f"Prediction success: {risk_level} (Prob: {risk_probability:.2f})")
        return jsonify(result)

    except Exception as e:
        logger.error(f"Prediction Error: {e}", exc_info=True)
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(debug=True, host='0.0.0.0', port=port)
