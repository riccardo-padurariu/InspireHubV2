import React from "react";
import '../Styles/Comment.css'
import Like from '../Assets/Thumbs up.svg';
import Dislike from '../Assets/Thumbs down.svg';
import pfp from '../Assets/iconamoon_profile-fill.svg';
import { db } from "../Authentification/Firebase";
import { getDatabase,ref } from "firebase/database";
import { app } from "../Authentification/Firebase";
import filled from '../Assets/Thumbs up (1).svg';
import { useAuth } from "../Authentification/AuthContext";
import { onValue,remove,update,push } from "firebase/database";

export default function Reply(props){

  const { currentUser } = useAuth();

  const [liked,setLiked] = React.useState(false);
  const [disliked,setDisliked] = React.useState(false);
  const [likedBy,setLikedBy] = React.useState([]);
  const [dislikedBy,setDislikedBy] = React.useState([]);

  /* Retriving the id's of the users who liked the reply*/
  React.useEffect(() => {
    if(!currentUser) return;

    const db = getDatabase(app);
    const likedByRef = ref(db, `posts/${props.postKey}/comments/${props.commentKey}/replies/${props.replyKey}/likedBy`);

    const unsubscribe = onValue(likedByRef, (snapshot) => {
      if(snapshot.exists()){
        const likedByData = snapshot.val();
        const likedByArr = Object.entries(likedByData);
        const newArr = likedByArr.map(([key,value]) => ({user: value, firebaseKey: key}));

        setLikedBy(newArr);
      }else{
        setLikedBy([]);
      }
    }, (error) => {
      console.log('Error fetching tasks: ', error);
    });

    return () => unsubscribe();
  }, [currentUser]);

  /* Retriving the id's of the users who disliked the reply*/
  React.useEffect(() => {
    if(!currentUser) return;

    const db = getDatabase(app);
    const dislikedByRef = ref(db, `posts/${props.postKey}/comments/${props.commentKey}/replies/${props.replyKey}/dislikedBy`); 

    const unsubscribe = onValue(dislikedByRef, (snapshot) => {
      if(snapshot.exists()){
        const dislikedByData = snapshot.val();
        const dislikedByArr = Object.entries(dislikedByData);
        const newArr = dislikedByArr.map(([key,value]) => ({user: value,firebaseKey: key}));
        setDislikedBy(newArr);
      }else{
        setDislikedBy([]);
      }
    }, (error) => {
      console.log('Error fetching tasks: ', error);
    });

    return () => unsubscribe();
  }, [currentUser]);

  /* Here we set the liked and disliked states based on the data that we are retrieving from firebase */ 
  React.useEffect(() => {

    if(!currentUser){
      setDisliked(false);
      setLiked(false);
      return;
    }

    if(Array.isArray(likedBy) && Array.isArray(dislikedBy)){
      if(existsInArray(likedBy,currentUser.uid).exists){
        setLiked(true);
        setDisliked(false);
      } else if(existsInArray(dislikedBy,currentUser.uid).exists){
        setDisliked(true);
        setLiked(false);
      } else {
        setLiked(false);
        setDisliked(false);
      }
    }

    console.log('postKey: ' + props.postKey);
    console.log('liked: ' + liked);
    console.log('disliked: ' + disliked);

  },[currentUser,likedBy,dislikedBy]);

  function existsInArray(array,value){
    let index = null;
    for(let i=0;i<array.length;i++)
      if(array[i].user === value){
        index = array[i].firebaseKey;
        return {exists: true, index: index};
      }
    return {exists: false, index: null};
  }

  /* Updating in the database the user interaction with the reply based on the function paramaters*/
  async function updateUserInteraction(amount,type){

    const db = getDatabase(app);
    const postRef = ref(db, `posts/${props.postKey}/comments/${props.commentKey}/replies/${props.replyKey}`);
    const postRef2 = ref(db,`posts/${props.postKey}/comments/${props.commentKey}/replies/${props.replyKey}/likedBy`);
    const postRef3 = ref(db,`posts/${props.postKey}/comments/${props.commentKey}/replies/${props.replyKey}/dislikedBy`);

    try{
      const obj = type === 'likes' ? {likes: amount} : {dislikes: amount};
      await update(postRef,obj);

      if(type === 'likes'){
        if(amount > props.likes){
          await push(postRef2,currentUser.uid);

          const dislikedId = existsInArray(dislikedBy,currentUser.uid);
          if(dislikedId.exists){
            const deleteRef = ref(db,`posts/${props.postKey}/comments/${props.commentKey}/replies/${props.replyKey}/dislikedBy/${dislikedId.index}`);
            await remove(deleteRef);
          }
        } else {
          const likedId = existsInArray(likedBy,currentUser.uid);
          if(likedId.exists){
            const deleteRef = ref(db,`posts/${props.postKey}/comments/${props.commentKey}/replies/${props.replyKey}/likedBy/${likedId.index}`);
            await remove(deleteRef);
          }
        }
      } else if(type === 'dislikes') {
        if(amount > props.dislikes){
          await push(postRef3,currentUser.uid);

          const likedId = existsInArray(likedBy,currentUser.uid);
          if(likedId.exists){
            const deleteRef = ref(db,`posts/${props.postKey}/comments/${props.commentKey}/replies/${props.replyKey}/likedBy/${likedId.index}`);
            await remove(deleteRef);
          }
        } else {
          const dislikedId = existsInArray(dislikedBy,currentUser.uid);
          if(dislikedId.exists){
            const deleteRef = ref(db,`posts/${props.postKey}/comments/${props.commentKey}/replies/${props.replyKey}/dislikedBy/${dislikedId.index}`);
            await remove(deleteRef);
          }
        }
      }
    }catch(error){
      console.log('Error updating status: ',error);
    }
  }

  /* The event listeners for when the like or dislike button is pressed*/
  function like(){
    if(!liked){
      updateUserInteraction(props.likes+1,'likes');
      setLiked(true);
      if(disliked){
        setDisliked(false);
        updateUserInteraction(props.dislikes-1,'dislikes');
      }
    }else {
      updateUserInteraction(props.likes-1,'likes');
      setLiked(false);
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

  console.log(props.user);

  /* The HTML component */
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