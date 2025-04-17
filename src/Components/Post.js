import React from "react";
import '../Styles/Post.css';
import img from '../Assets/Image.svg';
import line from '../Assets/Line 4.svg';
import down from '../Assets/down.svg';
import up from '../Assets/up.svg';

export default function Post(props){

  /*const arr = props.tags;
  const dArr = arr.map(item => 
    <div className="tag">
      {item}
    </div>
  );*/

  return (
    <div className="post-container">
      <div className="post-content">
        <div className="post-info">
          <div className="pfp-post">
            <img src={img}></img>
          </div>
          <div>
            <div className="main-post-info">
              <p className="post-title">{props.name}</p>
              <p className="post-description">{props.description}</p>
            </div>
            <p className="user-poster">Posted by: {props.user}</p>
          </div>
        </div>
        <img src={line}></img>
        <div className="tags">
          <p className="tags-post-title">Tags: </p>
          {/*dArr*/}
        </div>
      </div>
      <div className="ranking-post">
        <div className="rank-post">
          <img src={down}></img>
          <p className="number">{props.likes}</p>
        </div>
        <div className="rank-post">
          <img src={up}></img>
          <p className="number">{props.dislikes}</p>
        </div>
      </div>
    </div>
  );
}