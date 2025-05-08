import React from "react";
import '../Styles/Carousel.css';
import dot from '../Assets/Ellipse 12.png';
import arrow from '../Assets/line-md_arrow-down.png';
import { randomize } from "../QuotesData";

export default function Carousel() {

  let quotes = [];

  const date = new Date();
  if(date.getHours() == 0);
    randomize(quotes);

  console.log(quotes);

  const [index,setIndex] = React.useState(0);

  return (
    <div className="carousel-main-container">
      <div className="carousel-container">
        <p className="title-car">Today's Quote</p>
        <p className="quote">{`${quotes[index].text}  -  ${quotes[index].auth}`}</p>
        <div className="control-buttons">
          <button className="control-button-right" onClick={() => setIndex(prev => prev-1 >= 0 ? prev-1 : quotes.length-1)}>
            <img className="arrow" src={arrow}></img>
          </button>
          <div className="dots">
              <img className="dot" id='1' src={dot} onClick={() => setIndex(0)}></img>
              <img className="dot" id='2' src={dot} onClick={() => setIndex(1)}></img>
              <img className="dot" id='3' src={dot} onClick={() => setIndex(2)}></img>
              <img className="dot" id='4' src={dot} onClick={() => setIndex(3)}></img>
              <img className="dot" id='5' src={dot} onClick={() => setIndex(4)}></img>
              <img className="dot" id='6' src={dot} onClick={() => setIndex(5)}></img>
          </div>
          <button className="control-button-left" onClick={() => setIndex(prev => prev+1 < quotes.length ? prev+1 : 0)}>
            <img className="arrow-left" src={arrow}></img>
          </button>
        </div>
      </div>
    </div>
  );
}