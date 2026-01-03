import pandas as pd
import numpy as np

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
