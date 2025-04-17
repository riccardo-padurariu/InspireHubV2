import React from "react";
import '../Styles/Post.css';
import img from '../Assets/Image.svg';
import line from '../Assets/Line 4.svg';
import down from '../Assets/down.svg';
import up from '../Assets/up.svg';

export default function Post(props){

  const tags = props.tags || {};
  //console.log(arr);

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
            </div>
            <p className="user-poster">Posted by: {props.user}</p>
          </div>
        </div>
        <img src={line}></img>
        <div className="tags">
          <p className="tags-post-title">Tags: </p>
          {tags.ai && <div className="tag">AI</div>}
          {tags.productivity && <div className="tag">Productivity</div>}
          {tags.mentalHealth && <div className="tag">Mental Health</div>}
          {tags.learning && <div className="tag">Learning</div>}
          {tags.fitness && <div className="tag">Fitness</div>}
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