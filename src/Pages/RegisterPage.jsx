import React from "react";
import '../Styles/Register.css';
import back from '../Assets/Background.svg';
import logo from '../Assets/LOGO 1.svg';
import google from '../Assets/flat-color-icons_google.svg';
import { Link, Navigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../Authentification/Auth";
import { useAuth } from "../Authentification/AuthContext";
import { useNavigate } from "react-router-dom";
import { updateUserDisplayName } from "../Authentification/AuthContext";
import { doSignInWithGoogle } from "../Authentification/Auth";
import { updateProfile } from "firebase/auth";
import PopUpNotification from "../Components/PopUpNotification";
import { app } from "../Authentification/Firebase";
import { ref,get } from "firebase/database";
import { push,set } from "firebase/database";
import { Database, getDatabase } from "firebase/database";
import { useToast } from "../Components/ToastProvider";


export default function RegisterPage() {

  const navigation = useNavigate();
  const { addToast } = useToast();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setconfirmPassword] = React.useState('');
  const [isRegistering, setIsRegistering] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [fullName,setFullName] = React.useState('');
  const [displayError,setDisplayError] = React.useState(false);

  const { userLoggedIn } = useAuth();
  const { setCurrentUser } = useAuth();

  if(window.location.href === 'http://localhost:3000/home')
    document.body.style.overflow = "";
  else
    document.body.style.overflow = "hidden";

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
      if(!isRegistering) {
        setIsRegistering(true);
        try {
            const userCredential = await doCreateUserWithEmailAndPassword(email, password);
            await updateProfile(userCredential.user, {
                displayName: fullName
            });
            
            const db = getDatabase(app);
            const userRef = ref(db, `users/${userCredential.user.uid}`);
            
            setCurrentUser(userCredential.user);
            setDisplayError(false);
            navigation('/home');
        } catch (error) {
            setDisplayError(true);
            setErrorMessage(getUserFriendlyError(error));
            addToast(errorMessage,'error');
            setIsRegistering(false);
            console.log(error.code);
        }
      }
  }

  const onGoogleSignIn = (e) => {
        e.preventDefault()
        if (!isRegistering) {
            setIsRegistering(true)
            doSignInWithGoogle().catch(err => {
                setIsRegistering(false)
            })
        }
    }
    

  console.log(fullName);

  return (
    <div className="login-container">
      {userLoggedIn && <Navigate to="/dashboard/tasks" />}
      <img src={back} style={{width: 100 + '%', position: 'absolute'}}></img>
      <form className="login-div" style={{paddingTop: 55 + 'px',paddingBottom: '30px'}} onSubmit={onSubmit}>
        <img className="logo" src={logo}></img>
        <p className="title-login">Create your account</p>
        <div className="google-signin-div">
          <button onClick={onGoogleSignIn} className="signin-with-google">
            <img src={google}  className="google-icon"></img>
            Sign in with Google
          </button>
        </div>
        <p className="p-continue">or continue with email</p>
        <div className="data-input-flexbox">
          <div className="data-input-div">
            <p className="label">FULL NAME</p>
            <input className="data-input" placeholder="Enter your full name" value={fullName} onChange={(e) => {setFullName(e.target.value)}}></input>
          </div>
          <div className="data-input-div">
            <p className="label">EMAIL ADRESS</p>
            <input className="data-input" placeholder="your@email.com" value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
          </div>
          <div className="data-input-div">
            <p className="label">PASSWORD</p>
            <input className="data-input" placeholder="Enter your password" value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
          </div>
        </div>
        <div className="terms">
          <input className="terms-of-policy" type="checkbox"></input>
          <p className="forgot-password">I agree to InspireHub's Terms of Service and Privacy Policy</p>
        </div>
        <button className="signin-button">GET STARTED</button>
        <p className="option-register">Already have an account? <Link to={'/login'}><span className="register-link">Sign In</span></Link></p>
      </form>
    </div>
  );
}