import React from "react";
import '../Styles/Comment.css'
import Like from '../Assets/Thumbs up.svg';
import Dislike from '../Assets/Thumbs down.svg';
import pfp from '../Assets/iconamoon_profile-fill.svg';
import { db } from "../Authentification/Firebase";
import { update,getDatabase,ref } from "firebase/database";
import { app } from "../Authentification/Firebase";
import filled from '../Assets/Thumbs up (1).svg';


export default function Reply(props){

  const [liked,setLiked] = React.useState(false);
  const [disliked,setDisliked] = React.useState(false);

  console.log('reply key: ' + props.replyKey);

  async function updateUserInteraction(amount,type){
    
    const db = getDatabase(app);
    const postRef = ref(db, `posts/${props.postKey}/comments/${props.commentKey}/replies/${props.replyKey}`);
    try{
      const obj = type === 'likes' ? {likes:amount} : {dislikes:amount};
      console.log()
      await update(postRef,obj);
      //alert('Updated');
    }catch(error){
      console.log('Error updating status: ',error);
    }
  }

  function like(){
    if(!liked){
      setLiked(true);
      updateUserInteraction(props.likes+1,'likes');
      if(disliked){
        setDisliked(false);
        updateUserInteraction(props.dislikes-1,'dislikes');
      }
    }else {
      setLiked(false);
      updateUserInteraction(props.likes-1,'likes');
    }
  }

  function dislike(){
    if(!disliked){
      setDisliked(true);
      updateUserInteraction(props.dislikes+1,'dislikes');
      if(liked){
        setLiked(false);
        updateUserInteraction(props.likes-1,'likes');
      }
    }else{
      setDisliked(false);
      updateUserInteraction(props.dislikes-1,'dislikes');
    }
  }

  return(
    <div style={{marginBottom: '10px'}} className="comment-container">
      <img className="comment-pfp" src={pfp}></img>
      <div>
        <div className="user-and-date">
          <p className="comment-user">@{props.user}</p>
          <p className="comment-date">{props.date}</p>
        </div>
        <div className="comment-content">{props.content}</div>
        <div className="comment-statistics">
          <div style={{marginLeft: '5px'}} className="statistic">
            <img onClick={like} style={{width: '24px',marginRight: '5px',cursor:'pointer'}} src={liked ? filled : Like}></img>
            <p className="statistic-number">{props.likes}</p>
          </div>
          <div style={{marginLeft: '20px'}} className="statistic">
            <img onClick={dislike} style={{width: '24px',marginRight: '5px',cursor:'pointer',rotate: disliked ? '180deg' : ''}} src={disliked ? filled : Dislike}></img>
            <p className="statistic-number">{props.dislikes}</p>
          </div>
        </div>
      </div>
    </div>
  )
}