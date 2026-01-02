import os
import pickle
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import preprocess_input, generate_health_tips

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'cardio_model_week3.pkl')
model_data = {}

def load_model():
    """Load the trained model and scaler from pickle file."""
    if os.path.exists(MODEL_PATH):
        try:
            with open(MODEL_PATH, 'rb') as f:
                data = pickle.load(f)
                logger.info(f"Model loaded successfully from {MODEL_PATH}")
                return data
        except Exception as e:
            logger.error(f"Failed to load model: {e}")
            return {}
    else:
        logger.error(f"Model file not found at {MODEL_PATH}")
        return {}

model_data = load_model()

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({
        "status": "healthy", 
        "model_loaded": 'model' in model_data
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    """Prediction endpoint."""
    if 'model' not in model_data:
        logger.error("Predict called but model is not loaded.")
        return jsonify({"error": "Model not loaded"}), 500

    try:
        data = request.json
        logger.info(f"Received prediction request for age: {data.get('age')}")

        scaler = model_data.get('scaler')
        model = model_data['model']

        X_scaled = preprocess_input(data, scaler=scaler)
        
        probs = model.predict_proba(X_scaled)[0]
        prediction = model.predict(X_scaled)[0]
        
        risk_probability = float(probs[1]) 
        risk_level = "High" if risk_probability > 0.5 else "Low"
        
        tips = generate_health_tips(data)

        result = {
            "prediction": int(prediction),
            "probability": risk_probability,
            "risk_level": risk_level,
            "tips": tips
        }
        
        logger.info(f"Prediction success: {risk_level} Risk ({risk_probability:.2f})")
        return jsonify(result)

    except Exception as e:
        logger.exception("Error during prediction processing")
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    logger.info(f"Starting server on port {port}")
    app.run(debug=True, host='0.0.0.0', port=port)
