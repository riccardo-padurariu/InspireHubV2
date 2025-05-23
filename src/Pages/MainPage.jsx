import React from "react";
import Navbar from "../Components/Navbar";
import background from '../Assets/Background.svg';
import '../Styles/MainPage.css';
import Title from "../Components/Title";
import Carousel from "../Components/Carousel";
import Reasons from "../Components/Reasons";
import FeatureHighlights from "../Components/FeatureHighlights";
import PoweredBy from "../Components/PoweredBy";
import Footer from "../Components/Footer";
import { useAuth } from "../Authentification/AuthContext";
import { useRef } from "react";
import newBg from '../Assets/new-bg.svg';


export default function MainPage(props){

  const { currentUser } = useAuth();

  if(window.location.href === 'http://localhost:3000/home')
    document.body.style.overflowY = "";
  else
    document.body.style.overflowY = "hidden";

    const sectionRef = useRef(null);
    const ScrollToSection = () => {
        sectionRef.current?.ScrollIntoView({ behavior:  'smooth'});
    }


  return (
    <div className="main-page-container">
      <img className="back" src={newBg}></img>
      <Navbar setNeedsOverflow={props.setNeedsOverflow} />
      <Title ScrollIntoView={ScrollToSection}/>
      <Carousel />
      <Reasons />
      <FeatureHighlights />
      <PoweredBy />
      <Footer />
    </div>
  );
}