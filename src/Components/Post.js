import React from "react";
import '../Styles/Post.css';
import img from '../Assets/Image.svg';
import line from '../Assets/Line 4.svg';
import down from '../Assets/down.svg';
import up from '../Assets/up.svg';

export default function Post(){
  return (
    <div className="post-container">
      <div className="post-content">
        <div className="post-info">
          <div className="pfp-post">
            <img src={img}></img>
          </div>
          <div>
            <div className="main-post-info">
              <p className="post-title">Title of the post</p>
              <p className="post-description">Description of the post</p>
            </div>
            <p className="user-poster">Posted by: USER</p>
          </div>
        </div>
        <img src={line}></img>
        <div className="tags">
          <p className="tags-post-title">Tags: </p>
          <div className="tag">
            AI
          </div>
          <div className="tag">
            Productivity
          </div>
          <div className="tag">
            Mental Health
          </div>
        </div>
      </div>
      <div className="ranking-post">
        <div className="rank-post">
          <img src={down}></img>
          <p className="number">1234</p>
        </div>
        <div className="rank-post">
          <img src={up}></img>
          <p className="number">1234</p>
        </div>
      </div>
    </div>
  );
}