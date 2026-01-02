# Cardiovascular Disease Predictor

This project hosts a Machine Learning model for predicting cardiovascular disease risk, served via a Flask backend and a Next.js frontend.

## Project Structure

- `web/backend`: Flask API serving the XGBoost model.
- `web/frontend`: Next.js web application for user interaction.
- `*.ipynb`: Analysis and Model Training notebooks.

## Prerequisites

- Python 3.9+
- Node.js 18+

## Quick Start

### 1. Start the Backend

Navigate to the backend directory and run the Flask app:

```bash
cd web/backend
# Install dependencies if not already done
pip install -r requirements.txt
# Run the server
python app.py
```

The backend will run on `http://localhost:8080`.

### 2. Start the Frontend

Open a new terminal, navigate to the frontend directory, and start the development server:

```bash
cd web/frontend
# Install dependencies if not already done
npm install
# Run the app
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## Features

- **Interactive Form**: Easy input for health metrics.
- **Real-time Prediction**: Instant analysis using the trained XGBoost model.
- **Visual Feedback**: Risk assessment cards with probability visualization.
