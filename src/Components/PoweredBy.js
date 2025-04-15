import React from "react";
import '../Styles/PoweredBy.css';
import logo1 from '../Assets/Figma.png';
import logo2 from '../Assets/Vector (5).svg';
import logo3 from '../Assets/Firebase.png';
import logo4 from '../Assets/React.png';

export default function PoweredBy() {
  return (
    <div className="pb-main-div">
      <div className="pb-container">
        <div className="pb">POWERED BY</div>
        <p className="main-pb">Modern Web Technologies and Scalable Infrastructure.</p>
        <div className="apps">
          <div className="app">
            <img className="app-img" src={logo1}></img>
          </div>
          <div className="app">
            <img className="app-img" src={logo2}></img>
          </div>
          <div className="app">
            <img className="app-img" src={logo3}></img>
          </div>
          <div className="app">
            <img className="app-img" src={logo4}></img>
          </div> 
        </div>
      </div>
    </div>
  );
}