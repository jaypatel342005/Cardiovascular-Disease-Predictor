import pickle
import pandas as pd
import sklearn

print(f"Sklearn version: {sklearn.__version__}")

try:
    with open('cardio_model_week3.pkl', 'rb') as file:
        data = pickle.load(file)
    
    scaler = data['scaler']
    model = data['model']
    
    print(f"Scaler type: {type(scaler)}")
    print(f"Model type: {type(model)}")
    
    if hasattr(scaler, 'feature_names_in_'):
        print("Features expected by scaler:")
        print(list(scaler.feature_names_in_))
    elif hasattr(scaler, 'n_features_in_'):
        print(f"Number of features expected by scaler: {scaler.n_features_in_}")
    
    if hasattr(model, 'feature_names_in_'):
        print("Features expected by model:")
        print(list(model.feature_names_in_))

except Exception as e:
    print(f"Error: {e}")
