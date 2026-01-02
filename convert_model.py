import pickle
import os

OLD_PATH = 'web/frontend/api/cardio_model_week3.pkl'
NEW_PATH = 'web/frontend/api/cardio_model.json' # Using JSON/UBJSON if possible? No, XGBoost has save_model. 

# Better: Keep using pickle for now, but save ONLY the model object.
# Even better: Use model.save_model("model.json") to be totally dependency-free (no pickle)!
# JSON format is standard for XGBoost and requires NO pickle and NO sklearn wrapper overhead if we load it correctly.

if os.path.exists(OLD_PATH):
    try:
        with open(OLD_PATH, 'rb') as f:
            data = pickle.load(f)
        
        model = data['model']
        with open('model_type.txt', 'w') as f:
            f.write(str(type(model)))
        if hasattr(model, 'save_model'):
            # Save as UBJSON (universal binary json) or JSON
            # .json is safer for compatibility
            model.save_model('web/frontend/api/cardio_model.json')
            print("Successfully saved model to cardio_model.json")
        else:
            print("Model does not support save_model")
            
    except Exception as e:
        print(f"Error: {e}")
else:
    print("Old model file not found")
