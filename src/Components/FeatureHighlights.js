import React from "react";
import '../Styles/FeatureHighlights.css';
import ai from '../Assets/ai-dashboard.svg';

export default function FeatureHighlights() {
  return (
    <div className="ft-main-div">
      <div className="ft-container">
        <div className="ft">FEATURE HIGHLIGHTS</div>
        <p className="main-ft">Stay motivated, grow daily, 
        and achieve more!</p>
        <div className="features">
          <div className="feature-subdiv">
            <div className="feature">
              <p className="ft-title">Daily Motivational Quotes</p>
              <p className="ft-details">Start each day with powerful words of wisdom. Our daily quotes are carefully selected to uplift your mindset, boost confidence, and help you stay focused on your goals.</p>
            </div>
            <div className="feature">
              <p className="ft-title">Supportive Community</p>
              <p className="ft-details">You're not alone on this journey! Connect with like-minded individuals, share experiences, and gain motivation from a positive, growth-focused community.</p>
            </div>
          </div>
          <div className="feature-big">
            <p className="ft-title">AI-Powered Motivation</p>
            <p className="ft-details">Stay inspired with smart, personalized motivation. Our system delivers daily encouragement, goal-tracking, and self-improvement tips tailored to your journey.</p>
            <img src={ai} className="ai-img"></img>
          </div>
        </div>
      </div>
    </div>
  );
}