import json

notebook_path = 'c:\\College programming\\ML Project\\Master_Cardiovascular_Disease_Prediction.ipynb'

keywords = ['drop', 'X =', 'X_train', 'StandardScaler', 'bmi', 'fit', 'columns']

try:
    with open(notebook_path, 'r', encoding='utf-8') as f:
        nb = json.load(f)

    print("Filtered Code:")
    for cell in nb['cells']:
        if cell['cell_type'] == 'code':
            source = "".join(cell['source'])
            if any(k in source for k in keywords):
                print("-" * 20)
                print(source)
                print("-" * 20)

except Exception as e:
    print(f"Error: {e}")
