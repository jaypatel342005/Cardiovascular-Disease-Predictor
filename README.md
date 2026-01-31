
<div align="center">

# 🫀 CardioAI – Cardiovascular Disease Predictor

<img src="https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
<img src="https://img.shields.io/badge/scikit--learn-ML-blue?style=for-the-badge&logo=scikitlearn&logoColor=white" alt="scikit-learn">
<img src="https://img.shields.io/badge/XGBoost-Gradient%20Boosting-orange?style=for-the-badge" alt="XGBoost">
<img src="https://img.shields.io/badge/Next.js-Frontend-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
<img src="https://img.shields.io/badge/Vercel-Hosting-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">

**An end-to-end machine learning and web application pipeline for predicting cardiovascular disease from clinical and lifestyle metrics.**

[🌍 Live Demo](https://cardioai.vercel.app/) • [📂 GitHub Repo](https://github.com/jaypatel342005/Cardiovascular-Disease-Predictor) • [📧 Contact](mailto:pateljay97378@gmail.com)

</div>

---

## 📑 Table of Contents

- [🫀 CardioAI – Cardiovascular Disease Predictor](#-cardioai--cardiovascular-disease-predictor)
  - [📑 Table of Contents](#-table-of-contents)
  - [🌟 Overview](#-overview)
  - [🌍 Live Preview](#-live-preview)
  - [✨ Features](#-features)
  - [🧠 ML Workflow](#-ml-workflow)
  - [🧪 Dataset & Features](#-dataset--features)
  - [📊 Model Performance](#-model-performance)
  - [🛠 Tech Stack](#-tech-stack)
  - [📦 Installation](#-installation)
  - [🚀 Getting Started](#-getting-started)
  - [📂 Project Structure](#-project-structure)
  - [🧠 Project Retrospective](#-project-retrospective)
  - [📌 Future Improvements](#-future-improvements)
  - [🤝 Contribution](#-contribution)
  - [🔐 License](#-license)
  - [📞 Contact & Author](#-contact--author)

---

## 🌟 Overview

CardioAI is a **cardiovascular disease prediction system** that combines a complete machine learning pipeline with a clean, responsive web interface.  
It predicts whether a patient is likely to have cardiovascular disease based on routine health measurements and lifestyle indicators.

> ⚠️ **Disclaimer:** This project is for **educational and research** purposes only and must **not** be used as a medical device or for clinical decision-making.

---

## 🌍 Live Preview

<div align="center">

### 🔴 CardioAI Web App

**[👉 Open Live App](https://cardioai.vercel.app/)**

</div>

Use the web interface to:

- Enter patient details (age, gender, blood pressure, cholesterol, BMI, habits).
- Get an instant prediction (low/high risk).
- View a risk probability score.

---

## ✨ Features

- 🧮 **End-to-end ML Pipeline**  
  From preprocessing and feature engineering to model training, tuning, evaluation, and export.

- 🤖 **Multiple Classification Models**  
  Logistic Regression, SVM, KNN, Naive Bayes, Decision Trees, Random Forest, Gradient Boosting, XGBoost, Stacking, and Calibrated models.

- 🏆 **Optimized Ensemble Model**  
  Tuned **XGBoost** model selected as final classifier with strong cross-validation performance (~73.6% accuracy, macro F1 ≈ 0.73).

- 📈 **Robust Evaluation**  
  Confusion matrices, accuracy, precision, recall, and macro F1-score for all candidate models.

- 🌐 **Modern Web UI**  
  Clean, responsive form-based UI (Next.js / React) deployed on **Vercel**.

- ⚙️ **Production-Friendly Artifacts**  
  Trained models and scaler exported as `.pkl` files for easy reuse and integration.

---

## 🧠 ML Workflow

The project follows a **structured ML lifecycle**:

1. **Data Preparation**
   - Load `cardio_cleaned_week2.csv` (68,641 records).
   - Split into **features (X)** and **target (y = cardio)**.
   - Drop unused columns: `id`, `age`, `bmi_cat`.
   - Train–test split: **80% / 20%**.

2. **Preprocessing**
   - Standardize features using `StandardScaler` (fit on `X_train`, transform both train and test).
   - Ensure consistent scaling for model training and inference.

3. **Initial Model Experimentation**
   - Train 10 different classifiers on the same scaled data:
     - **Ensembles:** RandomForest, GradientBoosting, XGBoost, Stacking.
     - **Linear Models:** LogisticRegression, LinearSVC, CalibratedClassifierCV.
     - **Others:** KNeighbors, DecisionTree, GaussianNB.
   - Compare test accuracy, precision, recall, and macro F1.

4. **Hyperparameter Tuning**
   - Use `GridSearchCV` with 5-fold CV to tune:
     - **XGBoost**
     - **RandomForest**
   - Focus on cross-validation accuracy and macro F1.

5. **Final Model Selection**
   - Choose tuned **XGBoost** as the final model (slightly better CV accuracy than tuned RandomForest).
   - Export:
     - `best_xgboost_cvd_model.pkl`
     - `cardio_model_week3.pkl` (tuned RandomForest)
   - Each file includes the model + fitted `StandardScaler`.

---

## 🧪 Dataset & Features

- **Dataset:** `cardio_cleaned_week2.csv`
- **Total Records:** `68,641`
- **Target Column:**
  - `cardio` – 0 (no CVD) or 1 (presence of CVD)

### Features Used (13)

| Feature       | Description                                |
|---------------|--------------------------------------------|
| `gender`      | Encoded biological sex                    |
| `height`      | Height in centimeters                     |
| `weight`      | Weight in kilograms                       |
| `ap_hi`       | Systolic blood pressure                   |
| `ap_lo`       | Diastolic blood pressure                  |
| `cholesterol` | Categorical cholesterol level             |
| `gluc`        | Categorical glucose level                 |
| `smoke`       | Smoking status (0/1)                      |
| `alco`        | Alcohol intake (0/1)                      |
| `active`      | Physical activity (0/1)                   |
| `age_years`   | Age in years                              |
| `bmi`         | Body Mass Index                           |
| `MAP`         | Mean Arterial Pressure                    |

**Excluded Columns**

- `id`, `age`, `bmi_cat`

### Train–Test Split

- **Train:** 80% → `(54912, 13)`
- **Test:** 20% → `(13729, 13)`

---

## 📊 Model Performance

### Initial Test Accuracy

| Rank | Model                    | Test Accuracy |
|------|--------------------------|---------------|
| 1    | XGBoost                  | 73.25%        |
| 2    | RandomForestClassifier   | 73.19%        |
| 3    | StackingClassifier       | 73.18%        |
| 4    | GradientBoosting         | 73.14%        |
| 5    | DecisionTreeClassifier   | 72.60%        |
| 6    | CalibratedClassifierCV   | 72.44%        |
| 7    | LogisticRegression       | 72.34%        |
| 8    | LinearSVC                | 72.30%        |
| 9    | GaussianNB               | 71.48%        |
| 10   | KNeighborsClassifier     | 70.70%        |

All top ensemble models achieved **macro F1 ≈ 0.73**, with a balanced tradeoff between precision and recall.

### Confusion Matrices (Initial Stage)

- **XGBoost**
  - TN: 5352  
  - TP: 4705  
  - FP: 1633  
  - FN: 2039  

- **RandomForest**
  - TN: 5416  
  - TP: 4632  
  - FP: 1569  
  - FN: 2112  

### Overfitting Check (XGBoost Initial)

- **Train Accuracy:** 75.19%  
- **Test Accuracy:** 73.25%  
- **Conclusion:** Healthy generalization, minimal overfitting.

### Hyperparameter Tuning Results

**XGBoost (Final Chosen Model)**

- Best Params:
  - `gamma = 0`
  - `learning_rate = 0.05`
  - `max_depth = 3`
  - `min_child_weight = 5`
  - `n_estimators = 200`
  - `reg_alpha = 0`
- **Best CV Accuracy:** 73.63%
- **Test Accuracy:** 73.12%
- **Macro F1:** ≈ 0.73

**RandomForest (Alternative Final Model)**

- Best Params:
  - `max_depth = 10`
  - `max_features = 'sqrt'`
  - `min_samples_leaf = 1`
  - `min_samples_split = 2`
  - `n_estimators = 200`
- **Best CV Accuracy:** 73.50%
- **Test Accuracy:** 72.98%
- **Macro F1:** ≈ 0.73

> 🔍 The tuned models slightly reduced point-test accuracy vs their initial variants but improved cross-validation robustness—prioritizing **generalization**.

---

## 🛠 Tech Stack

<div align="center">

### 🧮 Machine Learning

<img src="https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white">
<img src="https://img.shields.io/badge/scikit--learn-ML-blue?style=for-the-badge&logo=scikitlearn&logoColor=white">
<img src="https://img.shields.io/badge/XGBoost-Gradient%20Boosting-orange?style=for-the-badge">
<img src="https://img.shields.io/badge/pandas-Data%20Processing-150458?style=for-the-badge&logo=pandas&logoColor=white">

### 🌐 Web & Deployment

<img src="https://img.shields.io/badge/Next.js-Frontend-000000?style=for-the-badge&logo=nextdotjs&logoColor=white">
<img src="https://img.shields.io/badge/React-UI-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
<img src="https://img.shields.io/badge/Vercel-Hosting-000000?style=for-the-badge&logo=vercel&logoColor=white">

### 🧪 Development

<img src="https://img.shields.io/badge/Jupyter-Notebooks-F37626?style=for-the-badge&logo=jupyter&logoColor=white">
<img src="https://img.shields.io/badge/Git-Version%20Control-F05032?style=for-the-badge&logo=git&logoColor=white">

</div>



## 📦 Installation

### ✅ Prerequisites

- Python 3.9+
- pip / conda
- Node.js (if running or modifying the frontend)
- Git

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/jaypatel342005/Cardiovascular-Disease-Predictor.git
cd Cardiovascular-Disease-Predictor
```

### 2️⃣ Setup Python Environment

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
```

If you have a separate frontend:

```bash
cd frontend
npm install
```

---

## 🚀 Getting Started

### 🧪 Run ML Experiments (Locally)

1. Open the `.ipynb` notebooks inside the `notebooks/` directory.
2. Run:
   - Data preprocessing
   - Baseline model training
   - GridSearchCV tuning
   - Model evaluation and export

### 🧮 Local Inference Example

```python
import pickle
import numpy as np

# Load model + scaler (as saved during training)
with open("models/best_xgboost_cvd_model.pkl", "rb") as f:
    model, scaler = pickle.load(f)  # adjust depending on how you saved it

# Sample patient
x = np.array([[1.00, 156.00, 85.00, 140.00, 90.00,
               3.00, 1.00, 0.00, 0.00, 1.00,
               55.38, 34.93, 106.67]])

x_scaled = scaler.transform(x)
pred = model.predict(x_scaled)
proba = model.predict_proba(x_scaled) [github](https://github.com/jaypatel342005/Cardiovascular-Disease-Predictor)

print("Prediction (0=no CVD, 1=CVD):", pred)
print("Probability of CVD:", proba)
```

### 🌐 Run / Modify Web App

If the repo contains a Next.js frontend:

```bash
cd frontend
npm run dev
```

Then visit:

- `http://localhost:3000` (or the port configured in your app)

---

## 📂 Project Structure

> Example structure – adapt to your repo layout.

```bash
Cardiovascular-Disease-Predictor/
├── data/
│   └── cardio_cleaned_week2.csv          # Cleaned dataset
├── notebooks/
│   ├── 01_data_preprocessing.ipynb
│   ├── 02_model_baselines.ipynb
│   ├── 03_hyperparameter_tuning.ipynb
│   └── 04_evaluation_and_export.ipynb
├── models/
│   ├── best_xgboost_cvd_model.pkl       # Tuned XGBoost + scaler
│   └── cardio_model_week3.pkl           # Tuned Random Forest + scaler
├── src/
│   ├── preprocessing.py
│   ├── train.py
│   └── evaluate.py
├── frontend/                            # (If present) Next.js / React app
│   ├── pages/
│   ├── components/
│   └── ...
├── requirements.txt
└── README.md
```

---

## 🧠 Project Retrospective

- **Broad Model Exploration Works:**  
  Trying 10+ models early established a clear performance baseline and quickly highlighted that **ensemble methods** (XGBoost, RF, GB) were best suited for this dataset.

- **Iterative Refinement is Key:**  
  Two-phase approach (baseline → tuning) made the process structured and efficient.

- **Performance Plateau (~73%):**  
  Top models converged around the same performance, suggesting that the current **feature set limits predictive power**.  
  To go beyond this ceiling, future work should focus on **better features** or **richer data**, not just different algorithms.

- **Generalization over Point Accuracy:**  
  Slight drop in single test-set accuracy for tuned models was acceptable because **cross-validation metrics improved**, meaning better behavior on unseen data.

---

## 📌 Future Improvements

- 🔬 **Feature Engineering**
  - Interaction features (e.g., age × blood pressure, BMI ranges).
  - Domain-specific scores and risk factors.

- 📚 **Data Enrichment**
  - Additional lab metrics, history of comorbidities, medications.
  - Longitudinal / time-series data.

- 🤖 **Advanced Modeling**
  - Cost-sensitive learning to handle asymmetric misclassification costs.
  - Calibrated ensembles and meta-model stacking.
  - Explainable AI (SHAP, LIME) integration in the UI.

- 🌐 **App Enhancements**
  - Batch CSV upload and bulk prediction.
  - Patient-friendly explanation of results and lifestyle suggestions (with disclaimers).
  - Dark mode, multi-language support.

---

## 🤝 Contribution

Contributions are always welcome! Here’s how you can help:

1. **Fork** the repository.
2. **Create a feature branch**:

   ```bash
   git checkout -b feature/new-feature
   ```

3. **Commit your changes**:

   ```bash
   git commit -m "Add new feature"
   ```

4. **Push to the branch**:

   ```bash
   git push origin feature/new-feature
   ```

5. **Open a Pull Request** and describe your changes.

---

## 🔐 License

This project is licensed under the **MIT License**.  
See the `LICENSE` file in this repository for more details.

---

## 📞 Contact & Author

**Author:** Jay Patel  
- 📧 Email: [pateljay97378@gmail.com](mailto:pateljay97378@gmail.com)  
- 🧑‍💻 GitHub: [@jaypatel342005](https://github.com/jaypatel342005)

---

<div align="center">

### ⭐ If you found this project useful, please consider giving it a star on GitHub!

**Made with ❤️ to explore AI for cardiovascular health.**

</div>
```
