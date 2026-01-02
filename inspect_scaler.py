import pickle
import numpy as np
import os

MODEL_PATH = 'web/frontend/api/cardio_model_week3.pkl'

if os.path.exists(MODEL_PATH):
    try:
        with open(MODEL_PATH, 'rb') as f:
            data = pickle.load(f)
            
        scaler = data.get('scaler')
        if scaler:
            print(f"Scaler Type: {type(scaler)}")
            if hasattr(scaler, 'mean_') and hasattr(scaler, 'scale_'):
                with open('scaler_output.txt', 'w') as out:
                    out.write(f"MEANS_RAW = {[float(x) for x in scaler.mean_]}\n")
                    out.write(f"SCALES_RAW = {[float(x) for x in scaler.scale_]}\n")
            else:
                print("Scaler does not have standard mean/scale attributes")
        else:
            print("No scaler found")
            
    except Exception as e:
        print(f"Error: {e}")
else:
    print("Model file not found")
