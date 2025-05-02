import React, { useCallback } from "react";
import '../Styles/Post.css';
import img from '../Assets/Image.svg';
import line from '../Assets/Line 4.svg';
import down from '../Assets/down.svg';
import up from '../Assets/up.svg';
import { app } from "../Authentification/Firebase";
import { getDatabase, remove } from "firebase/database";
import { update } from "firebase/database";
import { ref } from "firebase/database";
import { useAuth } from "../Authentification/AuthContext";
import { push } from "firebase/database";
import { onValue } from "firebase/database";
import { set } from "firebase/database";
import pfp from '../Assets/User.svg';
import firebase from "firebase/compat/app";

export default function Post(props){

  /* Destructuring the current user*/
  const { currentUser } = useAuth();


  /* Random states*/
  const [liked,setLiked] = React.useState(false);
  const [disliked,setDisliked] = React.useState(false);
  const [likedBy,setLikedBy] = React.useState([]);
  const [dislikedBy,setDislikedBy] = React.useState([]);


  /* Retriving the id's of the users who liked the post*/
  React.useEffect(() => {
    if(!currentUser) return;

    const db = getDatabase(app);
    const likedByRef = ref(db, `posts/${props.postKey}/likedBy`);

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


  /* Retriving the id's of the users who disliked the post*/
  React.useEffect(() => {
    if(!currentUser) return;

    const db = getDatabase(app);
    const dislikedByRef = ref(db, `posts/${props.postKey}/dislikedBy`); 

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


  /* Processing the tags to know what to display on the UI*/
  const tags = props.tags || {};
  
  function hasNoTags(){
    return !tags.ai && !tags.productivity && !tags.mentalHealth && !tags.learning && !tags.fitness && (!tags.moreTags || tags.moreTags === '');
  }

  function existsInArray(array,value){
    let index = null;
    for(let i=0;i<array.length;i++)
      if(array[i].user === value){
        index = array[i].firebaseKey;
        return {exists: true, index: index};
      }
    return {exists: false, index: null};
  }

  /* Updating in the database the user interaction with the post based on the function paramaters*/
  async function updateUserInteraction(amount,type){

    const db = getDatabase(app);
    const postRef = ref(db, `posts/${props.postKey}`);
    const postRef2 = ref(db,`posts/${props.postKey}/likedBy`);
    const postRef3 = ref(db,`posts/${props.postKey}/dislikedBy`);

    try{
      const obj = type === 'likes' ? {likes: amount} : {dislikes: amount};


      //I'm crying hereeeee :(
      /*const targetArr = type === 'likes' ? likedBy : dislikedBy;
      const targetRef = type === 'likes' ? postRef2 : postRef3;        
      const otherArr = type === 'likes' ? dislikedBy : likedBy;
      const otherRef = type === 'likes' ? postRef3 : postRef2;

      const functionObjTarget = existsInArray(targetArr,currentUser.uid);
      const functionObjOther = existsInArray(otherArr,currentUser.uid);

      if(!functionObjTarget.exists){
        await push(targetRef,currentUser.uid);
        if(functionObjOther.exists){
          const deleteRef = ref(db,`posts/${props.postKey}/${type === 'likes' ? 'likedBy' : 'dislikedBy'}/${functionObjOther.index}`);
          await remove(deleteRef);
          alert('deleted');
        }
        //alert('ok');
      }else{
        const deleteRef = ref(db,`posts/${props.postKey}/${type === 'likes' ? 'likedBy' : 'dislikedBy'}/${functionObjTarget.index}`);
        await remove(deleteRef);
        alert('deleted');
      }*/

      await update(postRef,obj);
    }catch(error){
      console.log('Error updating status: ',error);
    }
  }

  /* The event listeners for when the like or dislike button is pressed*/
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

  /* The HTML for the component*/
  return (
    <div className="post-container">
      <div className="post-content">
        <div className="post-info">
          <div className="pfp-post">
            <img src={pfp} style={{width: '36px'}}></img>
          </div>
          <div>
            <div className="main-post-info">
              <p style={{cursor: 'pointer'}} className="post-title" onClick={() => window.location = `/dashboard/community/${props.postKey}`}>{props.name}</p>
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
          {tags.moreTags && <div className="tag">{tags.moreTags}</div>}
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