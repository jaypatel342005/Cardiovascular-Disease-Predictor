# 🫀 CardioAI – Cardiovascular Disease Predictor

<div align="center">

![CardioAI Banner](https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=400&fit=crop&q=80)

### Advanced Machine Learning Pipeline for CVD Prediction

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-ML-0078D4?style=flat-square&logo=scikitlearn&logoColor=white)](https://scikit-learn.org)
[![XGBoost](https://img.shields.io/badge/XGBoost-Gradient%20Boosting-FF6B35?style=flat-square&logo=xgboost&logoColor=white)](https://xgboost.readthedocs.io)
[![Next.js](https://img.shields.io/badge/Next.js-Frontend-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**An end-to-end ML pipeline combining predictive analytics with a modern web interface for cardiovascular disease risk assessment.**

[🌍 **Live Demo**](https://cardioai.vercel.app/) • [📂 **GitHub Repository**](https://github.com/jaypatel342005/Cardiovascular-Disease-Predictor) • [💬 **Contact**](mailto:pateljay97378@gmail.com)

---

</div>

## 📋 Quick Navigation

| Section | Link |
|---------|------|
| Overview | [🌟 Jump to Overview](#-overview) |
| Features | [✨ Jump to Features](#-features) |
| Tech Stack | [🛠️ Jump to Tech Stack](#-tech-stack) |
| Getting Started | [🚀 Jump to Getting Started](#-getting-started) |
| Installation | [📦 Jump to Installation](#-installation) |

---

## 🌟 Overview

CardioAI is a **production-grade cardiovascular disease prediction system** that combines:

- 🧬 **Rigorous ML Pipeline** – Data preprocessing, feature engineering, model training, and optimization
- 🤖 **Ensemble Learning** – 10+ classification algorithms with hyperparameter tuning
- 📊 **High Performance** – ~73.6% accuracy with balanced precision-recall
- 🌐 **Modern Web Interface** – Clean, responsive Next.js UI for instant predictions
- ☁️ **Cloud Deployment** – Hosted on Vercel for global accessibility

> ⚠️ **Disclaimer:** This project is for **educational and research purposes only**. It is **not** a medical device and must **not** be used for clinical decision-making. Always consult qualified healthcare professionals.

---

## 🎯 Features at a Glance

<table>
<tr>
<td width="50%">

### 🧮 Machine Learning

- ✅ End-to-end preprocessing pipeline
- ✅ 10+ baseline classification models
- ✅ XGBoost ensemble optimization
- ✅ 5-fold cross-validation tuning
- ✅ Confusion matrix & F1 analysis
- ✅ Model serialization (.pkl)

</td>
<td width="50%">

### 🌐 Web Application

- ✅ Interactive patient data input form
- ✅ Real-time risk predictions
- ✅ Probability scoring system
- ✅ Responsive design (mobile-friendly)
- ✅ Vercel cloud deployment
- ✅ Fast inference (< 100ms)

</td>
</tr>
</table>

---

## 🧠 How It Works

```
┌─────────────────────────────────────────────────────────────┐
│  1. DATA PREPARATION                                        │
│  • Load: 68,641 patient records                             │
│  • Features: 13 clinical & lifestyle metrics                │
│  • Train-Test Split: 80% / 20%                              │
└─────────────────┬───────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────────┐
│  2. PREPROCESSING & SCALING                                 │
│  • StandardScaler normalization                             │
│  • Feature consistency across train & test                  │
└─────────────────┬───────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────────┐
│  3. MODEL EXPERIMENTATION                                   │
│  • 10 baseline classifiers evaluated                        │
│  • XGBoost emerges as top performer (73.25%)               │
└─────────────────┬───────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────────┐
│  4. HYPERPARAMETER TUNING                                   │
│  • GridSearchCV with 5-fold CV                              │
│  • Final XGBoost: 73.63% CV accuracy                        │
└─────────────────┬───────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────────────────────────┐
│  5. DEPLOYMENT & INFERENCE                                  │
│  • Model exported as .pkl                                   │
│  • Integrated into Next.js web app                          │
│  • Live at https://cardioai.vercel.app/                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🧪 Dataset & Features

### 📊 Dataset Overview

| Property | Value |
|----------|-------|
| **Dataset Name** | `cardio_cleaned_week2.csv` |
| **Total Records** | **68,641 patients** |
| **Features** | **13 clinical & lifestyle metrics** |
| **Target** | Binary (0 = No CVD, 1 = CVD Present) |
| **Train Set** | 54,912 samples (80%) |
| **Test Set** | 13,729 samples (20%) |

### 🔍 Features Used

| Feature | Type | Description |
|---------|------|-------------|
| `gender` | Categorical | Biological sex (encoded) |
| `age_years` | Numerical | Age in years |
| `height` | Numerical | Height in cm |
| `weight` | Numerical | Weight in kg |
| `bmi` | Numerical | Body Mass Index |
| `ap_hi` | Numerical | Systolic blood pressure (mmHg) |
| `ap_lo` | Numerical | Diastolic blood pressure (mmHg) |
| `MAP` | Numerical | Mean Arterial Pressure |
| `cholesterol` | Categorical | Cholesterol level (1-3) |
| `gluc` | Categorical | Glucose level (1-3) |
| `smoke` | Binary | Smoking status (0/1) |
| `alco` | Binary | Alcohol consumption (0/1) |
| `active` | Binary | Physical activity (0/1) |

---

## 📊 Model Performance & Results

### 🏆 Baseline Model Comparison

| Rank | Algorithm | Test Accuracy | Macro F1 | Status |
|------|-----------|---------------|----------|--------|
| 🥇 | **XGBoost** | **73.25%** | **0.73** | Selected |
| 🥈 | Random Forest | 73.19% | 0.73 | Alternative |
| 🥉 | Stacking | 73.18% | 0.73 | Backup |
| 4 | Gradient Boosting | 73.14% | 0.73 | — |
| 5 | Decision Tree | 72.60% | 0.72 | — |
| 6 | Calibrated Classifier | 72.44% | 0.72 | — |
| 7 | Logistic Regression | 72.34% | 0.72 | — |
| 8 | Linear SVM | 72.30% | 0.72 | — |
| 9 | Gaussian Naïve Bayes | 71.48% | 0.71 | — |
| 10 | KNN | 70.70% | 0.71 | — |

### 🎯 Final XGBoost Performance

```
CONFUSION MATRIX (Test Set)
─────────────────────────────
          Predicted
         No CVD | CVD
       ─────────────
Actual | 5,352 | 1,633  → 67.7% True Negative Rate
No CVD |       |
       ─────────────
       | 2,039 | 4,705  → 69.8% True Positive Rate
CVD    |       |
       ─────────────
       
📈 KEY METRICS
├─ Accuracy: 73.12%
├─ Macro F1: 0.73
├─ Precision: 0.74
└─ Recall: 0.70
```

### 🔬 Hyperparameter Tuning Results

**XGBoost (Final Champion)**
```python
Best Parameters:
  • learning_rate: 0.05
  • max_depth: 3
  • n_estimators: 200
  • min_child_weight: 5
  • gamma: 0
  • reg_alpha: 0

Performance:
  • CV Accuracy: 73.63% ✓
  • Test Accuracy: 73.12%
  • Generalization Gap: 0.51% (Excellent!)
```

---

## 🛠️ Tech Stack

<div align="center">

### Machine Learning & Data Science

![Python](https://img.shields.io/badge/Python%203.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-0078D4?style=for-the-badge&logo=scikitlearn&logoColor=white)
![XGBoost](https://img.shields.io/badge/XGBoost-FF6B35?style=for-the-badge)
![pandas](https://img.shields.io/badge/pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white)

### Frontend & Web

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

### Deployment & DevOps

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

### Development Tools

![Jupyter](https://img.shields.io/badge/Jupyter-F37626?style=for-the-badge&logo=jupyter&logoColor=white)
![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)

</div>

---

## 📦 Installation

### ✅ Prerequisites

Before you begin, ensure you have:

- **Python 3.9+** ([Download](https://python.org))
- **pip** or **conda** package manager
- **Node.js 16+** (for frontend modifications)
- **Git** for version control

### Step 1️⃣ – Clone Repository

```bash
git clone https://github.com/jaypatel342005/Cardiovascular-Disease-Predictor.git
cd Cardiovascular-Disease-Predictor
```

### Step 2️⃣ – Setup Python Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate

# macOS / Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### Step 3️⃣ – Setup Frontend (Optional)

If you want to run or modify the Next.js frontend locally:

```bash
cd frontend
npm install
```

### Step 4️⃣ – Verify Installation

```bash
# Check Python packages
pip list | grep -E "scikit-learn|xgboost|pandas"

# Check Node (if frontend setup)
node --version
npm --version
```

---

## 🚀 Getting Started

### 🧪 Option A: Run ML Experiments Locally

Perfect for understanding the ML pipeline!

```bash
# Navigate to notebooks
cd notebooks

# Start Jupyter
jupyter notebook

# Open these notebooks in order:
# 1. 01_data_preprocessing.ipynb
# 2. 02_model_baselines.ipynb
# 3. 03_hyperparameter_tuning.ipynb
# 4. 04_evaluation_and_export.ipynb
```

Each notebook includes:
- 📝 Detailed comments explaining each step
- 📊 Data visualizations
- 🧮 Model training & evaluation
- 💾 Model export to `.pkl` files

### 🔮 Option B: Local Inference Example

Use pre-trained models for predictions:

```python
import pickle
import numpy as np
from sklearn.preprocessing import StandardScaler

# Load trained model + scaler
with open("models/best_xgboost_cvd_model.pkl", "rb") as f:
    model, scaler = pickle.load(f)

# Sample patient data (13 features)
patient_data = np.array([[
    1.0,      # gender: 1 (female)
    156.0,    # height: 156 cm
    85.0,     # weight: 85 kg
    140.0,    # ap_hi: 140 mmHg (systolic)
    90.0,     # ap_lo: 90 mmHg (diastolic)
    3.0,      # cholesterol: 3
    1.0,      # gluc: 1
    0.0,      # smoke: 0
    0.0,      # alco: 0
    1.0,      # active: 1
    55.38,    # age_years: 55.38 years
    34.93,    # bmi: 34.93
    106.67    # MAP: 106.67
]])

# Preprocess & predict
patient_scaled = scaler.transform(patient_data)
prediction = model.predict(patient_scaled)[0]
probability = model.predict_proba(patient_scaled)[0]

print(f"CVD Risk: {'HIGH RISK ⚠️' if prediction == 1 else 'LOW RISK ✓'}")
print(f"Probability of CVD: {probability[1]:.2%}")
```

### 🌐 Option C: Run Web App Locally

```bash
cd frontend
npm run dev

# Open browser: http://localhost:3000
```

Features:
- 📋 Interactive form to enter patient metrics
- ⚡ Real-time predictions via API
- 📊 Risk score visualization
- 📱 Fully responsive design

### ☁️ Option D: Use Live Demo

No setup needed!

👉 **[Open CardioAI Web App](https://cardioai.vercel.app/)**

---

## 📂 Project Structure

```
Cardiovascular-Disease-Predictor/
│
├── 📊 data/
│   └── cardio_cleaned_week2.csv              # 68,641 patient records
│
├── 📓 notebooks/                             # Jupyter notebooks (ML pipeline)
│   ├── 01_data_preprocessing.ipynb
│   ├── 02_model_baselines.ipynb
│   ├── 03_hyperparameter_tuning.ipynb
│   └── 04_evaluation_and_export.ipynb
│
├── 🤖 models/                                # Trained model artifacts
│   ├── best_xgboost_cvd_model.pkl           # ⭐ Final XGBoost + scaler
│   └── cardio_model_week3.pkl               # Alternative RandomForest + scaler
│
├── 🐍 src/                                   # Python utilities
│   ├── preprocessing.py
│   ├── train.py
│   ├── evaluate.py
│   └── __init__.py
│
├── 🌐 frontend/                              # Next.js React application
│   ├── pages/
│   │   ├── index.js                         # Main prediction page
│   │   └── api/
│   │       └── predict.js                   # ML inference endpoint
│   ├── components/
│   │   ├── PredictionForm.jsx
│   │   ├── ResultCard.jsx
│   │   └── RiskGauge.jsx
│   ├── styles/
│   ├── public/
│   ├── package.json
│   └── next.config.js
│
├── 📋 requirements.txt                       # Python dependencies
├── ✨ README.md                              # This file
├── 📄 LICENSE                                # MIT License
└── 🔗 .gitignore                             # Git ignore rules

```

---

## 🧠 Technical Deep Dive

### ML Workflow Pipeline

```
DATA INGESTION
    ↓
    ├─ Load: cardio_cleaned_week2.csv
    ├─ Shape: (68,641, 13)
    └─ Target distribution checked
    ↓
EXPLORATORY DATA ANALYSIS (EDA)
    ↓
    ├─ Missing value detection
    ├─ Feature statistics (mean, std, range)
    ├─ Class imbalance analysis
    └─ Correlation heatmap
    ↓
PREPROCESSING & FEATURE ENGINEERING
    ↓
    ├─ Drop: id, age, bmi_cat columns
    ├─ Standardize: StandardScaler()
    │   └─ Fitted on training data only
    ├─ Handle outliers if necessary
    └─ Feature consistency validation
    ↓
DATA SPLITTING
    ↓
    ├─ Train: 80% (54,912 samples)
    ├─ Test: 20% (13,729 samples)
    └─ Random seed: 42 (reproducibility)
    ↓
MODEL EXPERIMENTATION (Baseline Phase)
    ↓
    ├─ LogisticRegression ........................ 72.34%
    ├─ SVM (LinearSVC) ........................... 72.30%
    ├─ K-Nearest Neighbors ....................... 70.70%
    ├─ Decision Tree ............................. 72.60%
    ├─ Gaussian Naïve Bayes ...................... 71.48%
    ├─ Random Forest ............................. 73.19% ← Good
    ├─ Gradient Boosting ......................... 73.14% ← Good
    ├─ Stacking ................................. 73.18% ← Good
    └─ XGBoost .................................. 73.25% ← BEST ⭐
    ↓
HYPERPARAMETER TUNING (Optimization Phase)
    ↓
    ├─ Selected: XGBoost & RandomForest
    ├─ Method: GridSearchCV
    ├─ CV Strategy: 5-Fold cross-validation
    ├─ Metric: Accuracy + Macro F1
    ├─ Search Space:
    │   ├─ learning_rate: [0.01, 0.05, 0.1]
    │   ├─ max_depth: [3, 5, 7]
    │   ├─ n_estimators: [100, 200, 300]
    │   └─ ... (other params)
    └─ Results:
        ├─ XGBoost CV Accuracy: 73.63% ✓ SELECTED
        └─ RandomForest CV Accuracy: 73.50%
    ↓
FINAL EVALUATION
    ↓
    ├─ Confusion Matrix
    ├─ Classification Report
    ├─ ROC-AUC Analysis
    ├─ Feature Importance Plot
    └─ Cross-validation curves
    ↓
MODEL EXPORT & DEPLOYMENT
    ↓
    ├─ Serialize: best_xgboost_cvd_model.pkl
    ├─ Include: Model + fitted StandardScaler
    ├─ Integrate: Next.js API route
    └─ Deploy: Vercel cloud
    ↓
PRODUCTION INFERENCE
    ↓
    └─ User submits patient data → 
       Predictions served in <100ms
```

### Why XGBoost Won

| Criterion | XGBoost | RandomForest | Winner |
|-----------|---------|--------------|--------|
| Baseline Accuracy | 73.25% | 73.19% | 🎯 XGBoost |
| CV Accuracy (Tuned) | 73.63% | 73.50% | 🎯 XGBoost |
| Generalization | +0.51% | +0.31% | 🎯 XGBoost |
| Training Speed | ⚡ Fast | ⚡⚡ Faster | RandomForest |
| Interpretability | 📊 Good | 📊📊 Better | RandomForest |

**Decision:** XGBoost selected for **better CV performance & generalization**.

---

## 🔄 Model Persistence & Inference

### How Models Are Saved

```python
import pickle

# During training:
model_package = (trained_model, fitted_scaler)
with open("best_xgboost_cvd_model.pkl", "wb") as f:
    pickle.dump(model_package, f)
```

### How Models Are Loaded

```python
import pickle

# During inference:
with open("best_xgboost_cvd_model.pkl", "rb") as f:
    model, scaler = pickle.load(f)

# Predict
features_scaled = scaler.transform(new_data)
prediction = model.predict(features_scaled)
probability = model.predict_proba(features_scaled)
```

---

## 📈 Project Insights & Learnings

### ✅ What Worked Well

1. **Ensemble Methods Dominate**  
   Top-performing models (XGBoost, RandomForest, Stacking) all used ensemble learning, suggesting this dataset benefits from model averaging.

2. **Broad Exploration Pays Off**  
   Testing 10 baseline models quickly established that ensembles were best. Focused tuning on top candidates (XGBoost, RF) was efficient.

3. **CV-Driven Tuning**  
   GridSearchCV with 5-fold CV identified truly generalizable parameters, not just test-set optimizations.

4. **Minimal Overfitting**  
   XGBoost's train accuracy (75.19%) vs test accuracy (73.25%) gap was healthy—indicating good generalization.

### 🎯 Performance Plateau (~73%)

All top models converged around **73% accuracy**, suggesting:

- ✅ Current feature set captures key CVD patterns
- ⚠️ Performance ceiling may be limited by available features
- 🔬 **Next step:** Feature engineering, not algorithm switching

### 🚀 Future Optimization Opportunities

1. **Advanced Feature Engineering**
   - Polynomial features (age², weight/height ratio)
   - Interaction terms (age × blood pressure)
   - Domain-driven scores (Framingham Risk Score)

2. **Data Enrichment**
   - Additional lab metrics (LDL, HDL, triglycerides)
   - Family history, medication data
   - Time-series / longitudinal records

3. **Explainability Integration**
   - SHAP values for feature importance
   - LIME for local explanations
   - Risk factor breakdown in UI

4. **Cost-Sensitive Learning**
   - Misclassifying CVD patients (FN) more costly than false alarms (FP)
   - Adjust class weights in model training

---

## 🤝 Contributing

We welcome contributions! Here's how:

### 1. Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/Cardiovascular-Disease-Predictor.git
cd Cardiovascular-Disease-Predictor
```

### 2. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Make Changes & Commit

```bash
git add .
git commit -m "Add: Your clear commit message"
```

### 4. Push & Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then open a PR on GitHub with:
- Clear description of changes
- Why the change is needed
- Any related issues

### Contribution Ideas

- 🧠 **ML:** Better feature engineering, new algorithms, ensemble strategies
- 🌐 **Frontend:** UI improvements, accessibility, new visualizations
- 📊 **Data:** Additional datasets, preprocessing improvements
- 📚 **Docs:** Tutorial videos, architecture guides, deployment guides

---

## 📜 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

MIT License means:
- ✅ Use commercially
- ✅ Modify & distribute
- ✅ Use privately
- ⚠️ Include license & copyright notice

---

## 🤖 API Documentation

### Prediction Endpoint

**POST** `/api/predict`

**Request Body:**
```json
{
  "gender": 1,
  "age_years": 55.38,
  "height": 156,
  "weight": 85,
  "ap_hi": 140,
  "ap_lo": 90,
  "cholesterol": 3,
  "gluc": 1,
  "smoke": 0,
  "alco": 0,
  "active": 1,
  "bmi": 34.93,
  "map": 106.67
}
```

**Response:**
```json
{
  "prediction": 1,
  "probability": [0.42, 0.58],
  "risk_level": "HIGH",
  "confidence": 0.58
}
```

---

## 📞 Contact & Support

<div align="center">

### Get in Touch

**Jay Patel**  
Machine Learning Engineer | Full-Stack Developer

📧 **Email:** [pateljay97378@gmail.com](mailto:pelajay97378@gmail.com)  
💼 **GitHub:** [@jaypatel342005](https://github.com/jaypatel342005)  
🔗 **LinkedIn:** [Connect](https://linkedin.com)  

**Have questions?** Open an [Issue](https://github.com/jaypatel342005/Cardiovascular-Disease-Predictor/issues) on GitHub!

---

### ⭐ Show Your Support

If this project helped you, please:

- ⭐ **Star** this repository on GitHub
- 🔗 **Share** with your network
- 📢 **Contribute** with PRs or ideas
- 💬 **Give feedback** via issues

</div>

---

<div align="center">

### Made with ❤️ to Advance Healthcare AI

**CardioAI © 2024 | All Rights Reserved**

![Profile Views](https://komarev.com/ghpvc/?username=jaypatel342005&color=blueviolet)

</div>
