import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-container">
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❄</div>
    
      <header className="header">
      <img src="/me.png" alt="Profile" className="profile-image" />
        <h1 className="title">Welcome to Fraud Detection System</h1>
      </header>
      <div className="content">
        <div className="description">
          <p>
            Online fraud poses a significant threat to individuals and businesses worldwide, with cybercriminals continually devising new methods to deceive and steal. This type of fraud encompasses a range of activities, including unauthorized transactions, identity theft, and phishing scams, all aimed at exploiting unsuspecting victims. The financial and emotional impact of online fraud can be devastating, leading to substantial monetary losses, damaged reputations, and diminished trust in online platforms.
          </p>
          <p>
            Machine learning models offer a powerful solution to combat online fraud by detecting suspicious patterns and behaviors that might be missed by traditional methods. These models analyze vast amounts of transaction data, identifying anomalies that could indicate fraudulent activities. By learning from historical data, machine learning algorithms can predict and prevent potential fraud in real-time, enhancing security measures and protecting both consumers and businesses. The continuous evolution of these models ensures they stay ahead of emerging threats, providing a robust defense against the ever-present dangers of online fraud.
          </p>
        </div>
        <div className="cta">
          <Link to="/detect" className="cta-button">Get Started</Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
