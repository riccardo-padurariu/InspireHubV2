import React from "react";
import '../Styles/Comment.css';
import like from '../Assets/Thumbs up.svg';
import dislike from '../Assets/Thumbs down.svg';
import pfp from '../Assets/iconamoon_profile-fill.svg';

export default function Comment(props){
  return (
    <div className="comment-container">
      <img className="comment-pfp" src={pfp}></img>
      <div>
        <div className="user-and-date">
          <p className="comment-user">@{props.user}</p>
          <p className="comment-date">28.04.2025</p>
        </div>
        <div className="comment-content">{props.content}</div>
        <div className="comment-statistics">
          <div style={{marginLeft: '5px'}} className="statistic">
            <img style={{width: '24px',marginRight: '5px',cursor:'pointer'}} src={like}></img>
            <p className="statistic-number">{props.likes}</p>
          </div>
          <div style={{marginLeft: '20px'}} className="statistic">
            <img style={{width: '24px',marginRight: '5px',cursor:'pointer'}} src={dislike}></img>
            <p className="statistic-number">{props.dislikes}</p>
          </div>
        </div>
      </div>
    </div>
  )
}