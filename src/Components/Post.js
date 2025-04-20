import React from "react";
import '../Styles/Post.css';
import img from '../Assets/Image.svg';
import line from '../Assets/Line 4.svg';
import down from '../Assets/down.svg';
import up from '../Assets/up.svg';
import { app } from "../Authentification/Firebase";
import { getDatabase } from "firebase/database";
import { update } from "firebase/database";
import { ref } from "firebase/database";

export default function Post(props){

  const [liked,setLiked] = React.useState(false);
  const [disliked,setDisliked] = React.useState(false);

  const tags = props.tags || {};
  
  function hasNoTags(){
    return !tags.ai && !tags.productivity && !tags.mentalHealth && !tags.learning && !tags.fitness;
  }

  async function updateUserInteraction(amount,type){

    const db = getDatabase(app);
    const taskRef = ref(db, `posts/${props.postKey}`);

    try{
      const obj = type === 'likes' ? {likes:amount} : {dislikes:amount};
      await update(taskRef,obj);
      //alert('Updated');
    }catch(error){
      console.log('Error updating status: ',error);
    }
  }

  function like(){
    if(!liked){
      updateUserInteraction(props.likes+1,'likes');
      setLiked(true);
      if(disliked){
        updateUserInteraction(props.dislikes-1,'dislikes');
        setDisliked(false);
      }
    }else {
      updateUserInteraction(props.likes-1,'likes');
      setLiked(false);
    }
  }

  function dislike(){
    if(!disliked){
      updateUserInteraction(props.dislikes+1,'dislikes');
      setDisliked(true);
      if(liked){
        updateUserInteraction(props.likes-1,'likes');
        setLiked(false);
      }
    }else{
      updateUserInteraction(props.dislikes-1,'dislikes');
      setDisliked(false);
    }
  }

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
          {hasNoTags() ? <p className="tags-post-title">No tags </p> : <p className="tags-post-title">Tags: </p>}
          {tags.ai && <div className="tag">AI</div>}
          {tags.productivity && <div className="tag">Productivity</div>}
          {tags.mentalHealth && <div className="tag">Mental Health</div>}
          {tags.learning && <div className="tag">Learning</div>}
          {tags.fitness && <div className="tag">Fitness</div>}
          
        </div>
      </div>
      <div className="ranking-post">
        <div onClick={dislike} className="rank-post">
          <img src={down}></img>
          <p className="number">{props.dislikes}</p>
        </div>
        <div onClick={like} className="rank-post">
          <img src={up}></img>
          <p className="number">{props.likes}</p>
        </div>
      </div>
    </div>
  );
}