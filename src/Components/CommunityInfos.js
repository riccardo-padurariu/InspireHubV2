import React from "react";
import '../Styles/Quote.css';
import img from '../Assets/Image.svg';

export default function CommunityInfo(props) {

  const aiStyle = {
    background: 'linear-gradient(90deg, #244CA1 0%, #872341 100%)'
  }

  return (
    <div className="quote-main-div">
      <div className="quote-container" style={aiStyle}>
        <p className="quote-title" style={{fontSize: 32 + 'px',margin: 0 + 'px'}}>Welcome to the InspireHub Community Forum</p>
        <p className="quote-description" style={{margin: 0 + 'px'}}>Got a question, idea, or need support? Share it here! This is a space where people help each other, grow together, and spark inspiration. </p>
        <p className="quote-description" style={{margin: 0 + 'px',fontWeight: 700}}>Let’s build progress — together.</p>
      </div>
      <div className="more-quotes-container day-container">
        <p className="more-quotes-title">Post Of The Day!</p>
        <div className="day-post-div">
            <div className="day-post-info day-p">
                <p className="user-day-post day-p">By User: USER NAME</p>
                <p className="user-day-inspire-points day-p">With 1234 Inspire Points</p>
                <p className="day-title-post day-p">Title Of The Post</p>
            </div>
            <div className="img-day">
                <img src={img}></img>
            </div>
        </div>
      </div>
    </div>
  );
}