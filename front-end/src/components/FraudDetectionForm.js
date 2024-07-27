import React, { useState } from 'react';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';

const FraudDetectionForm = () => {
  const [formData, setFormData] = useState({
    step: '1',
    type: 'CASH_OUT',
    amount: '0',
    nameOrig: 'C728984460',
    oldbalanceOrg: '0',
    newbalanceOrig: '0',
    nameDest: 'C639921569',
    oldbalanceDest: '0',
    newbalanceDest: '0'
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        transactions: [formData]
      });
      setResult(response.data.predictions[0]);
    } catch (error) {
      console.error(error);
    } finally {
    setLoading(false); // Set loading state to false
  }
  };

  const handleGoBack = () => {
    setResult(null);
    setFormData({
        step: '1',
        type: 'CASH_OUT',
        amount: '0',
        nameOrig: 'C728984460',
        oldbalanceOrg: '0',
        newbalanceOrig: '0',
        nameDest: 'C639921569',
        oldbalanceDest: '0',
        newbalanceDest: '0'
    });
  };

  return (
    <div className="form-container">
      <header className="header">
        <img src="/me.png" alt="Profile" className="profile-image" />
        <h1 className="title">Know about your transaction</h1>
      </header>
      <div className="form-content">
        {loading ? (
          <div className="loader-container">
            <Circles color="#f472b6" height={80} width={80} /> {/* Loader component */}
          </div>
        ) :result === null ? (
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="step">Step:</label>
              <input type="number" name="step" value={formData.step} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="type">Type:</label>
              <select name="type" value={formData.type} onChange={handleChange} className="form-input">
                <option value="CASH_OUT">CASH_OUT</option>
                <option value="PAYMENT">PAYMENT</option>
                <option value="CASH_IN">CASH_IN</option>
                <option value="TRANSFER">TRANSFER</option>
                <option value="DEBIT">DEBIT</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount:</label>
              <input type="number" name="amount" value={formData.amount} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="nameOrig">Name Orig:</label>
              <input type="text" name="nameOrig" value={formData.nameOrig} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="oldbalanceOrg">Old balance org:</label>
              <input type="number" name="oldbalanceOrg" value={formData.oldbalanceOrg} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="newbalanceOrig">New balance orig:</label>
              <input type="number" name="newbalanceOrig" value={formData.newbalanceOrig} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="nameDest">Name Dest:</label>
              <input type="text" name="nameDest" value={formData.nameDest} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="oldbalanceDest">Old balance dest:</label>
              <input type="number" name="oldbalanceDest" value={formData.oldbalanceDest} onChange={handleChange} className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="newbalanceDest">New balance dest:</label>
              <input type="number" name="newbalanceDest" value={formData.newbalanceDest} onChange={handleChange} className="form-input" />
            </div>
            <button type="submit" className="submit-button">Detect</button>
          </form>
        ) : (
          <div className="result">
            {result === 1 ? (
              <div className="fraud-result">
                <img src="/fraud-image.png" alt="Fraud" className="result-image" />
                <p className="result-text">Be Careful! That's mostly a Fraud transaction!!!</p>
              </div>
            ) : (
              <div className="safe-result">
                <img src="/safe-image.png" alt="Safe" className="result-image" />
                <p className="result-text">Most likely a safe transaction!</p>
              </div>
            )}
            <button onClick={handleGoBack} className="go-back-button">Go Back</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FraudDetectionForm;
