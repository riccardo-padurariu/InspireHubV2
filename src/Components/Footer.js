import React from "react";
import '../Styles/Footer.css';
import logo from '../Assets/LOGO 2.png'

export default function Footer() {
  return (
    <div className="footer-main-div">
      <div className="footer-container">
        <div className="div1">
          <div className="logo-div">
            <img src={logo}></img>
          </div>
          <div className="pages">
            <p className="page">Home</p>
            <p className="page">Our Mission</p>
            <p className="page">Contact</p>
          </div>
        </div>
        <div className="div2">
          <div className="email">
            <p className="label">STAY CONNECTED</p>
            <div className="input-div">
              <input className="email-input" placeholder="Enter email adress"></input>
              <button className="signup-button">Sign up</button>
            </div>
          </div>
          <div className="copyright">
            <p className="p1">Copyright &#169; 2025 InspireHub</p>
            <p className="p1">Prototype version 0x001</p>
          </div>
        </div>
      </div>
    </div>
  );
}