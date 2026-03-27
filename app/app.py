from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)


model = pickle.load(open('../model/model.pkl', 'rb'))
scaler = pickle.load(open('../model/scaler.pkl', 'rb'))



@app.route('/')
def home():
    return "Heart Risk API running ✅"



@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        features = [
            float(data['age']),
            float(data['sex']),
            float(data['cp']),
            float(data['trestbps']),
            float(data['chol']),
            float(data['thalach']),
            float(data['oldpeak']),
            float(data['ca']),
            float(data['thal']),
            float(data['exang']),
            float(data['slope'])
        ]

        features = scaler.transform([features])

        prob = model.predict_proba(features)[0][1]
        pred = 1 if prob > 0.5 else 0

        result = "High Risk ⚠️" if pred else "Low Risk ✅"

        return {
            "result": result,
            "probability": float(prob)
        }

    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    app.run(debug=True)