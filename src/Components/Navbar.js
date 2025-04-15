import React from "react";
import '../Styles/Navbar.css';
import logo from '../Assets/LOGO 2.png';
import { Link } from "react-router-dom";
import { useAuth } from "../Authentification/AuthContext";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../Authentification/Auth";

export default function Navbar(props) {
  
  const navigate = useNavigate();
  const { userLoggedIn, currentUser } = useAuth();
  
  return (
    <div className="nav-main">
      <div className="navbar-container">
        <div className="logo">
          <img src={logo}></img>
        </div>
        <div className="sections">
          <p className="section">Home</p>
          <p className="section">Our mission</p>
          <p className="section">Contact</p>
        </div>
        {userLoggedIn ? 
        <div className="user-buttons-logged">
          <p className="user-greet">Welcome back, {currentUser.displayName}</p>
        </div>
        :
        <div className="user-buttons">
          <Link to={'/login'}><button className="login-button">Login</button></Link>
          <Link to={'/register'}><button className="register-button">Sign up</button></Link>
        </div>}
      </div>
    </div>
  );
}