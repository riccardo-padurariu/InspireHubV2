import React from "react";
import '../Styles/ProgressBar.css';

export default function ProgressBar(props) {

  function getColor(){
    if(props.checked / props.total * 100 < 40)
      return "#ff0000";
    else if(props.checked / props.total * 100 < 70)
      return "#ffa500";
    return "#2eec71";
  }

  return (
    <div className="progressbar-container">
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{width: `${props.total === 0 ? 0 : props.checked / props.total * 100}%`, background: getColor()}}></div>
      </div>
    </div>
  );
}