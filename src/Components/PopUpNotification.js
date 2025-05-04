import React from "react";
import '../Styles/PopUpNotification.css';
import icon from '../Assets/Icon.svg';
import icon2 from '../Assets/Icon (1).svg';

export default function PopUpNotification({ toasts }){

  console.log(toasts);

  return (
    <div>
      {toasts.map(({id,message,type}) => 
        <div className={`notification notification-${type}`}type>
          <div className="notification-body">
            <img src={type === 'error' ? icon2 : icon} className="notification-icon"></img>
            {message !== '' ? message : 'Something went wrong...Please try again.'}
          </div>
          <div className={`notification-progress-${type}`}></div>
        </div>
      )}
    </div>
  );
}