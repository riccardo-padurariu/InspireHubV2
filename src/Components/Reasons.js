import React from "react";
import '../Styles/Reasons.css';
import div1 from '../Assets/statistic up.png';
import div2 from '../Assets/Vector (3).png';
import div3 from '../Assets/Vector (4).png';

export default function Reasons(){
  return (
    <div className="reasons-main-div">
      <div className="reasons-container">
        <div className="why-inspire-hub">WHY INSPIREHUB?</div>
        <p className="main-reason">Simple,effective, and inspiring.</p>
        <div className="reasons-div">
          <div className="reason">
            <img className="icon" src={div1}></img>
            <p className="reason-title">Personal Growth Made Easy</p>
            <p className="reason-explanation">Get daily motivation, challenges, 
            and resources to help you improve 
            step by step.
            </p>
          </div>
          <div className="reason">
            <img className="icon" src={div2}></img>
            <p className="reason-title">Seamless Experience</p>
            <p className="reason-explanation">Enjoy a smooth, user-friendly platform 
            designed to keep you engaged and motivated.
            </p>
          </div>
          <div className="reason">
            <img className="icon" src={div3}></img>
            <p className="reason-title">Achieve Your Goals</p>
            <p className="reason-explanation">Stay on track with structured challenges 
            and tools that help you grow every day.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}