import React from "react";
import '../Styles/Comment.css';
import Like from '../Assets/Thumbs up.svg';
import Dislike from '../Assets/Thumbs down.svg';
import pfp from '../Assets/iconamoon_profile-fill.svg';
import arr from '../Assets/arrow_right.svg';
import { getDatabase,push,ref } from "firebase/database";
import { app } from "../Authentification/Firebase";
import { useAuth } from "../Authentification/AuthContext";
import { onValue } from "firebase/database";
import Reply from "./Reply";
import filled from '../Assets/Thumbs up (1).svg';
import { update } from "firebase/database";

export default function Comment(props){

  const { currentUser } = useAuth();

  const [isReplying,setIsReplying] = React.useState(false);
  const [reply,setReply] = React.useState('');
  const [show,setShow] = React.useState(false);
  const [replyArray,setReplyArray] = React.useState([]);

  const [liked,setLiked] = React.useState(false);
  const [disliked,setDisliked] = React.useState(false);

  React.useEffect(() => {
    if(!currentUser) return;

    const db = getDatabase(app);
    const userTasksRef = ref(db, `posts/${props.postKey}/comments/${props.commentKey}/replies`);

    const unsubscribe = onValue(userTasksRef, (snapshot) => {
      if(snapshot.exists()){
        const replyData = snapshot.val();

        const replyArr = Object.entries(replyData).map(([key,value]) => ({
          ...value,
          firebaseKey: key
        }))

        console.log('reply arr for comment with id: ' + props.commentKey);
        console.log(replyArr);

        setReplyArray(replyArr);
      }else{
        setReplyArray([]);
      }
    }, (error) => {
      console.log('Error fetching tasks: ', error);
    });

    return () => unsubscribe();
  }, [props.commentKey, props.postKey]);

  console.log('reply array for comment: ' + props.commentKey);
  console.log(replyArray);


  async function fetchData() {
    const db = getDatabase(app);
    const replyRef = ref(db, `posts/${props.postKey}/comments/${props.commentKey}/replies`);
    const date = new Date();
    const dateStr = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`
    const newReply = {
      user: currentUser.displayName,
      content: reply,
      likes: 0,
      dislikes: 0,
      date: dateStr
    };
    
    await push(replyRef, newReply);
  }

  function postReply(){
    fetchData().catch(error => console.log(error));

    setIsReplying(false);
    setReply('');
  }

  async function updateUserInteraction(amount,type){
    
    const db = getDatabase(app);
    const postRef = ref(db, `posts/${props.postKey}/comments/${props.commentKey}`);
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

  return (
    <div className="comment-container">
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
          <div onClick={dislike} style={{marginLeft: '20px'}} className="statistic">
            <img style={{width: '24px',marginRight: '5px',cursor:'pointer',rotate: disliked ? '180deg' : ''}} src={disliked ? filled : Dislike}></img>
            <p className="statistic-number">{props.dislikes}</p>
          </div>
          <button className="reply-button" onClick={() => setIsReplying(true)}>Reply</button>
          {replyArray.length > 0 && <button onClick={() => setShow(!show)} className="reply-button">
            {show ? 'Hide replies' : 'Show replies'}
            <img style={{rotate: show ? '180deg' : ''}} src={arr}></img>  
          </button>}
        </div>
        {isReplying && <div className="reply-input-container">
            <img style={{width: '24px'}} src={pfp}></img>
            <input value={reply} onChange={(e) => setReply(e.target.value)} type="text" className="reply-input"></input>
            <div className="reply-buttons">
              <button className="reply-button" onClick={() => setIsReplying(false)}>Cancel</button>
              <button onClick={postReply} className={reply.length > 0 ? "reply-button" : "inactive-button"}>Reply</button>
            </div>
          </div>}
          {show && replyArray.map((item) => 
            <Reply
              user={currentUser.displayName}
              date={item.date}
              content={item.content}
              likes={item.likes}
              dislikes={item.dislikes}
              replyKey={item.firebaseKey}
              postKey={props.postKey}
              commentKey={props.commentKey}
            />
          )}
      </div>
    </div>
  )
}