import React from "react";
import '../Styles/Quote.css';
import motivationalQuotes from "../QuotesData";

export default function Quote() {

  let randIndex = 0;

  setInterval(() => randIndex = Math.floor(Math.random() * 100),8640000);

  return (
    <div className="quote-main-div">
      <div className="quote-container">
        <p className="quote-title">Today's quote</p>
        <p className="quote-description">{`${motivationalQuotes[randIndex].quote}  -  ${motivationalQuotes[randIndex].author}`}</p>
      </div>
      <div className="more-quotes-container">
        <p className="more-quotes-title">Want more inspiration?</p>
        <p className="more-quotes-description">Click below to explore a collection of powerful motivational quotes!</p>
        <button className="more-quotes-button" onClick={() => window.location = '/home'}>See More Quotes</button>
      </div>
    </div>
  );
}