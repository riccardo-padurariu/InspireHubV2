import React from "react";
import '../Styles/Login.css';
import back from '../Assets/Background.svg';
import logo from '../Assets/LOGO 1.svg';
import google from '../Assets/flat-color-icons_google.svg';
import { Navigate,Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Authentification/AuthContext";
import { doSignInWithEmailAndPassword } from "../Authentification/Auth";
import { doSignInWithGoogle } from "../Authentification/Auth";
import { getAuth } from "firebase/auth";
import PopUpNotification from "../Components/PopUpNotification";
import { ToastProvider, useToast } from "../Components/ToastProvider";

export default function LoginPage() {
  const navigation = useNavigate();
  const { addToast } = useToast();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isSigningIn, setIsSigningIn] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [displayError,setDisplayError] = React.useState(false);

  const { userLoggedIn } = useAuth();

  function getUserFriendlyError(error){
    switch(error.code){
      case "auth/invalid-email":
        return "Invalid email.";
      case "auth/wrong-password":
        return "Incorrect password.";
      case "auth/invalid-credential":
        return "Incorrect password";
      default:
        return "Something went wrong...Please try again.";
    }
  }

  const onSubmit = async (e) => {
      e.preventDefault()
      if(!isSigningIn) {
          setIsSigningIn(true);
          try{
            await doSignInWithEmailAndPassword(email, password);
            setDisplayError(false);
          } catch(error){
            setIsSigningIn(false);
            setErrorMessage(getUserFriendlyError(error));
            setDisplayError(true);
            addToast(errorMessage,'error');
            console.log(error.code);
          }
      }
  }

  if(window.location.href === 'http://localhost:3000/home')
    document.body.style.overflow = "";
  else
    document.body.style.overflow = "hidden";

  const onGoogleSignIn = (e) => {
      e.preventDefault()
      if (!isSigningIn) {
          setIsSigningIn(true);
          try{
            doSignInWithGoogle().catch(err => {
                setIsSigningIn(false)
            })
          }catch(error){
            console.log("Firebase error", error);
            setIsSigningIn(false);
          }
      }
  }


  return (
      <div className="login-container">
        {userLoggedIn && <Navigate to="/dashboard/tasks" />}
        <img src={back} style={{width: 100 + '%', position: 'absolute'}}></img>
        <form className="login-div" style={{paddingTop: (displayError ? 60 : 120) + 'px'}} onSubmit={onSubmit}>
          <img className="logo" src={logo}></img>
          <p className="title-login">Log into your account</p>
          <div className="google-signin-div">
            <button onClick={onGoogleSignIn} className="signin-with-google">
              <img src={google} className="google-icon"></img>
              Sign in with Google
            </button>
          </div>
          <p className="p-continue">or continue with email</p>
          <div className="data-input-flexbox">
            <div className="data-input-div">
              <p className="label">EMAIL ADRESS</p>
              <input className="data-input" placeholder="Enter email adress" value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
            </div>
            <div className="data-input-div">
              <p className="label">PASSWORD</p>
              <input className="data-input" placeholder="Enter your password" value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
            </div>
          </div>
          <p className="forgot-password">Forgot your password?</p>
          <button className="signin-button">{isSigningIn ? 'SIGNING IN...' : 'SIGN IN'}</button>
          <p className="option-register">Do not have an account yet? <Link to={'/register'}><span className="register-link">Sign Up</span></Link></p>
        </form>
      </div>
  );
}