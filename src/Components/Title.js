import React from "react";
import '../Styles/Title.css';

export default function Title(props) {
  return (
    <div className="title-main-div">
      <div className="title-container">
        <button className="prototype-now-button">PROTOTYPE LIVE NOW</button>
        <p className="big-title"><span className="big-ass-title">Find inspiration.</span>Grow.Become the Best Version of Yourself.</p>
        <p className="subtitle">InspireHub is your go-to place for support, inspiration, and tools to transform your life.</p>
        <div className="title-buttons">
          <button className="begin-button" onClick={() => window.location = 'dashboard/community'}>Begin Your Journey</button>
          <button className="mission-button" onClick={() => window.scrollTo({top: window.innerHeight+450,behavior:'smooth'})}>Our Mission</button>
        </div>
      </div>
    </div>
  );
}