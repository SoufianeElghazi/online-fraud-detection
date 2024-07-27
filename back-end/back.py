from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import tensorflow as tf
import numpy as np

# Load the model and preprocessing tools
model = tf.keras.models.load_model('model/ann_fraud_detection_model.h5')
scaler = joblib.load('model/scaler.pkl')
le_type = joblib.load('model/label_encoder_type.pkl')
le_nameOrig = joblib.load('model/label_encoder_nameOrig.pkl')
le_nameDest = joblib.load('model/label_encoder_nameDest.pkl')

# Create Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)


# Define preprocess function
def preprocess_transaction(transaction):
    transaction['step'] = int(transaction['step'])
    transaction['type'] = le_type.transform([transaction['type']])[0]
    transaction['amount'] = float(transaction['amount'])
    transaction['nameOrig'] = le_nameOrig.transform([transaction['nameOrig']])[0]
    transaction['oldbalanceOrg'] = float(transaction['oldbalanceOrg'])
    transaction['newbalanceOrig'] = float(transaction['newbalanceOrig'])
    transaction['nameDest'] = le_nameDest.transform([transaction['nameDest']])[0]
    transaction['oldbalanceDest'] = float(transaction['oldbalanceDest'])
    transaction['newbalanceDest'] = float(transaction['newbalanceDest'])

    numerical_features = np.array([[transaction['amount'], transaction['oldbalanceOrg'], transaction['newbalanceOrig'], transaction['oldbalanceDest'], transaction['newbalanceDest']]])
    numerical_features = scaler.transform(numerical_features)
    features = np.array([[transaction['step'], transaction['type'], transaction['nameOrig'], transaction['nameDest'],
                          numerical_features[0][0], numerical_features[0][1], numerical_features[0][2], 
                          numerical_features[0][3], numerical_features[0][4]]])
    return features

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    transactions = data['transactions']
    results = []
    
    for transaction in transactions:
        print(transaction)
        features = preprocess_transaction(transaction)
        print(features)
        prediction = model.predict(features)
        result = int(prediction[0] > 0.5)
        results.append(result)
    
    return jsonify({'predictions': results})

if __name__ == '__main__':
    app.run(debug=True)
