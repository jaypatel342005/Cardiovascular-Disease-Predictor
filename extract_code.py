import json

notebook_path = 'c:\\College programming\\ML Project\\Master_Cardiovascular_Disease_Prediction.ipynb'

try:
    with open(notebook_path, 'r', encoding='utf-8') as f:
        nb = json.load(f)

    print("Extracted Code:")
    for cell in nb['cells']:
        if cell['cell_type'] == 'code':
            source = "".join(cell['source'])
            print("-" * 20)
            print(source)
            print("-" * 20)

except Exception as e:
    print(f"Error: {e}")
