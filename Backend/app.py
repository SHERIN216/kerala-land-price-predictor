import joblib
from flask import Flask, render_template, request
import pandas as pd
import numpy as np
import logging

app = Flask(__name__)

# ================================
# Logging
# ================================
logging.basicConfig(
    filename='model_inputs.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

# ================================
# Load model
# ================================
MODEL_PATH = r"C:\Users\sheri\land-price-predictor\model\land_price_model_rf.pkl"
model = joblib.load(MODEL_PATH)

# ================================
# Helper to safely convert to float
# ================================
def to_float(value, default=0.0):
    try:
        return float(value)
    except (ValueError, TypeError):
        return default

# ================================
# Routes
# ================================
@app.route("/", methods=["GET", "POST"])
def index():
    prediction = None

    if request.method == "POST":
        # Collect user inputs safely
        input_data = {
            "property_id": 0,
            "location_name": request.form.get("location_name", "").strip(),
            "taluk": request.form.get("taluk", "").strip(),
            "village": request.form.get("village", "").strip(),
            "latitude": to_float(request.form.get("latitude")),
            "longitude": to_float(request.form.get("longitude")),
            "land_area_cents": to_float(request.form.get("land_area_cents")),
            "land_type": request.form.get("land_type", "").strip(),
            "distance_to_school_km": to_float(request.form.get("distance_to_school_km")),
            "distance_to_airport_km": to_float(request.form.get("distance_to_airport_km")),
            "distance_to_railway_station_km": to_float(request.form.get("distance_to_railway_station_km")),
            "distance_to_hospital_km": to_float(request.form.get("distance_to_hospital_km")),
            "distance_to_medical_college_km": to_float(request.form.get("distance_to_medical_college_km")),
            "distance_to_bus_stop_km": to_float(request.form.get("distance_to_bus_stop_km")),
            "distance_to_market_km": to_float(request.form.get("distance_to_market_km"))
        }

        df = pd.DataFrame([input_data])

        # Add model-specific features
        df["log_land_area"] = np.log1p(df["land_area_cents"])
        df["accessibility_score"] = (
            df["distance_to_school_km"] +
            df["distance_to_airport_km"] +
            df["distance_to_railway_station_km"]
        )

        # Log the input
        logging.info(f"Model input: {df.to_dict(orient='records')[0]}")

        try:
            # Predict
            prediction = model.predict(df)[0]
            logging.info(f"Prediction: {prediction}")
        except Exception as e:
            logging.error(f"Prediction failed: {e}")
            prediction = None

    return render_template("index.html", prediction=prediction)

if __name__ == "__main__":
    print("Starting Flask server at http://127.0.0.1:5000")
    app.run(host="127.0.0.1", port=5000, debug=False, use_reloader=False)

