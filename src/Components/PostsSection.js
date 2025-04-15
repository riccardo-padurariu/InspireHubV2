import React from "react";
import '../Styles/PostsSection.css';
import search from '../Assets/Search-icon.svg';
import Post from "./Post";

export default function PostsSection(){


  window.addEventListener('resize', function() {
    document.querySelector('.post-section-container').style.height = window.innerHeight-305 + "px";
  });

  return(
    <div className="post-section-container" style={{height: window.innerHeight-305 + "px"}}>
      <div className="post-board">
        <div className="post-input">
          <input className="search-post-input" type="text" placeholder="Search for a post"></input>
          <button className="search-post-button">
            <img src={search}></img>
          </button>
        </div>
        <button className="create-post-button">Create A Post</button>
      </div>
      <div className="tags-container">
        <div className="tag">
          AI
        </div>
        <div className="tag">
          Productivity
        </div>
        <div className="tag">
          Mental Health
        </div>
        <div className="tag">
          Learning
        </div>
        <div className="tag">
          Fitness
        </div>
        <div className="tag selected">
          More Tags
        </div>
      </div>
      <div className="posts-container">
        <Post />
      </div>
    </div>
  );
}