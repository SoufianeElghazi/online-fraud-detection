import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import FraudDetectionForm from './components/FraudDetectionForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/detect" element={<FraudDetectionForm />} />
      </Routes>
    </Router>
  );
}

export default App;
