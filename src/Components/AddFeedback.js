import React from "react";
import '../Styles/AddTaskModal.css';
import cross from '../Assets/material-symbols_close-rounded.svg';
import backImg from '../Assets/Saly-26.svg';
import { useAuth } from "../Authentification/AuthContext";
import { Database, getDatabase } from "firebase/database";
import { ref,get } from "firebase/database";
import img from '../Assets/1 1.svg';
import filled from '../Assets/star-filled.svg';
import empty from '../Assets/star-empty.svg';

export default function AddFeedback(props) {

  const { currentUser } = useAuth();
  const isFilled = [0,0,0,0,0];
  

  const styleOnAdding = {
    backdropFilter: 'blur(10px)',
    zIndex: 1000,
    position: 'fixed',
    //marginLeft: '-1510px',
    left: 0,
    opacity: 1,
    //width: '1520px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  }

  const styleOnNormal = {
    backdropFilter: 'blur(10px)',
    zIndex: -1,
    position: 'relative',
    marginLeft: '-1510px',
    opacity: 0,
    width: '1520px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }

  function handleFeedback(index){
    if(!isFilled[index]){
      for(let i=0;i<=index;i++){
        isFilled[i] = 1;
      }
    }else{
      for(let i=index+1;i<=4;i++){
        isFilled[i] = 0;
      }
    }
    console.log(isFilled);
  }


  return (
    <div className="add-task-div" style={props.isAddingFeedback ? styleOnAdding : styleOnNormal}>
      <div className="add-task-modal-container">
        <div className="title-exit-button">
          <p className="add-task-title">Give Us Your Feedback</p>
          <button className="exit-button" onClick={() => {props.setIsAddingFeedback(false)}}>
            <img className="cross-img" src={cross}></img>
          </button>
        </div>
        <div className="info-img-div">
          <div className="infos">
            <div className="add-task-input-div">
              <p className="label-add-task">Email adress</p>
              <input className="input-add-task name-modal" type="text" placeholder="Set your email adress"></input>
            </div>
            <div className="add-task-input-div">
              <p className="label-add-task">Your feedback</p>
              <input className="input-add-task-description desc" type="text" placeholder="Tell us about your experience"></input>
            </div>
            <div className="add-task-input-div">
              <p className="label-add-task" style={{fontSize: '15px'}}>How many stars would you give us?</p>
            </div>
            <div className="stars">
              <img className="star 0-index" src={isFilled[0] ? filled : empty} onClick={() => handleFeedback(0)}></img>
              <img className="star 1-index" src={isFilled[1] ? filled : empty} onClick={() => handleFeedback(1)}></img>
              <img className="star 2-index" src={isFilled[2] ? filled : empty} onClick={() => handleFeedback(2)}></img>
              <img className="star 3-index" src={isFilled[3] ? filled : empty} onClick={() => handleFeedback(3)}></img>
              <img className="star 4-index" src={isFilled[4] ? filled : empty} onClick={() => handleFeedback(4)}></img> 
            </div>
            <button className="add-task-modal-button" style={{fontSize: '11px'}} onClick={() => props.setIsAddingFeedback(false)}>SEND FEEDBACK</button>
          </div>
          <img className="info-img" src={img} style={{marginTop: '60px'}}></img>
        </div>
      </div>
    </div>
  );
}