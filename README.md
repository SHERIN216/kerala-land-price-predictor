# 🏡 Kerala Land Price Predictor

**AI-based land valuation using location & accessibility features in Kerala, India.**

This web application predicts the estimated price of land in Kerala based on user-provided property information such as location, land type, land area, and distances to key amenities like schools, hospitals, airports, and markets.

---

## **Features**

- User-friendly **form-based input** for property details.
- Calculates an **estimated land value in Lakhs** using a trained Random Forest model.
- Logs all user inputs and predictions for analysis.
- Modern, clean **UI with Bootstrap and custom CSS**.
- Easy to run locally with Flask.

---

## **Technology Stack**

- **Backend:** Python, Flask, Pandas, NumPy, joblib
- **Machine Learning:** Scikit-learn Random Forest model
- **Frontend:** HTML, CSS, Bootstrap 5
- **Logging:** Python logging module
- **Model:**Random Forest Regressor trained on Kerala land dataset.
- **Features:** location, land type, area, distance to schools, hospitals, airports, markets.


## Screenshots

### Input Form
![Land Price Form](assets/form.png)
![Land Price Form](assets/formdata.png)


### Predicted Result
![Prediction Result](assets/prediction.png)



---

## **Usage**

### **1. Clone the repository**
1. Clone the repository:
   git clone https://github.com/SHERIN216/kerala-land-price-predictor.git
2. Navigate into the project directory:
   cd land-price-predictor
3. Create and activate a virtual environment (recommended):
   python -m venv venv
   venv\Scripts\activate      # Windows
4. Install dependencies:
   pip install -r requirements.txt
5. Run the Flask app:
   cd Backend
   python app.py
6. Open your browser and go to:
   http://127.0.0.1:5000


