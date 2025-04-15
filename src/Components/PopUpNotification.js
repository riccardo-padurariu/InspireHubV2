import React from "react";
import '../Styles/PopUpNotification.css';
import icon from '../Assets/Icon.svg';
import icon2 from '../Assets/Icon (1).svg';

export default function PopUpNotification(props){
  return (
    <div>
      <div className={`notification notification-${props.role}`}>
        <div className="notification-body">
          <img src={props.role === 'fail' ? icon2 : icon} className="notification-icon"></img>
          {props.role === 'fail' ? `Error: ${props.error}` : props.role === 'created' ? 'Your account has been created!' : 'Succesfully logged-in!'}
        </div>
        <div className={`notification-progress-${props.role}`}></div>
      </div>
    </div>
  );
}