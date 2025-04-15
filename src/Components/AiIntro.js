import React from "react";
import '../Styles/Quote.css';

export default function AiIntro(props) {

  const aiStyle = {
    background: 'linear-gradient(90deg, #244CA1 0%, #872341 100%)'
  }

  return (
    <div className="quote-main-div">
      <div className="quote-container" style={aiStyle}>
        <p className="quote-title" style={{fontSize: 37 + 'px',margin: 0 + 'px'}}>Meet Astra – Your Smart Companion</p>
        <p className="quote-description" style={{margin: 0 + 'px'}}>Astra helps inspire, assist, and guide you daily. Learning and adapting, it delivers meaningful interactions to enhance your experience.</p>
        <p className="quote-description" style={{margin: 0 + 'px',fontWeight: 700}}>Disclaimer: Astra is in beta—responses may not always be accurate. Your feedback helps us improve!</p>
      </div>
      <div className="more-quotes-container">
        <p className="more-quotes-title">Help Improve Astra!</p>
        <p className="more-quotes-description">Click below to share your thoughts and help us refine Astra for a better experience.</p>
        <button className="more-quotes-button" onClick={() => props.setIsAddingFeedback(true)}>Give Feedback</button>
      </div>
    </div>
  );
}