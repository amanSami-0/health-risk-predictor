# 🩺 Health Risk Predictor 

A comprehensive machine learning application designed to assess the risk of multiple health conditions, including **Heart Disease**

This repository features an ultra-premium glassmorphic React (Vite) frontend and a highly efficient Flask API backend that serves specialized `scikit-learn` Random Forest classifiers.

---

## ✨ Features

- **Multi-Disease Prediction**: Switch seamlessly between predicting Heart Disease, Diabetes, and Cancer risks.
- **State-of-the-Art UI**: Built with React, Tailwind CSS, and a premium glassmorphic aesthetic featuring ambient, glowing background elements.
- **Robust Machine Learning**: Implements separate linear regression classifiers optimized for specific medical datasets.
- **Fast Backend**: A lightweight Flask API for efficient loading of serialized (`.pkl`) models and real-time inference.

---

## 🛠 Tech Stack

**Frontend:**
- React 19
- Vite
- Tailwind CSS v4

**Backend:**
- Python 3.x
- Flask
- Scikit-Learn
- Pandas / NumPy
- Joblib / Pickle (Model Serialization)

---

## 🚀 Getting Started

Follow these steps to run the application locally.

### 1. Start the Flask Backend
The backend runs on `http://127.0.0.1:5000` and exposes the `/predict` endpoints.

```bash
# Clone the repository
git clone https://github.com/your-username/health-risk-predictor.git
cd health-risk-predictor

# Create and activate a virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Start the Flask API
python app/app.py
```

### 2. Start the React Frontend
In a **new terminal window**, initialize the UI:

```bash
# Navigate to the frontend directory
cd frontend

# Install Node dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`. Open this URL in your browser to interact with the application.

---

## 🧠 Model Training

If you want to re-train the models with updated datasets:

1. Place your data files inside the `data/` directory (`heart.csv`, `diabetes.csv`, etc.).
2. Run the training script:
```bash
python model/train_model.py
```
3. The new models and robust data scalers will securely overwrite the older `.pkl` files in the `model/` directory.

---

## 📁 Project Structure

```text
├── app/
│   └── app.py               # Flask backend API
├── data/                    # CSV datasets (diabetes, heart disease, etc.)
├── frontend/                # React / Vite SPA
│   ├── src/                 # React components and Tailwind styles
│   └── package.json         # Node dependencies
├── model/
│   ├── preprocess.py        # Data cleaning and scaling logic
│   ├── train_model.py       # ML Pipeline for training and serialization
│   └── *.pkl                # Serialized predictive models & scalers
├── requirements.txt         # Python dependencies
└── README.md                # Project documentation
```

---

*Disclaimer: This tool is designed for educational and demonstrative purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.*
