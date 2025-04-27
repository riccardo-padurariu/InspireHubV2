import React, { useCallback } from "react";
import '../Styles/Post.css';
import img from '../Assets/Image.svg';
import line from '../Assets/Line 4.svg';
import down from '../Assets/down.svg';
import up from '../Assets/up.svg';
import { app } from "../Authentification/Firebase";
import { getDatabase } from "firebase/database";
import { update } from "firebase/database";
import { ref } from "firebase/database";
import { useAuth } from "../Authentification/AuthContext";
import { push } from "firebase/database";
import { onValue } from "firebase/database";
import { set } from "firebase/database";
import pfp from '../Assets/User.svg';

export default function Post(props){

  const { currentUser } = useAuth();

  const [dbObject,setDbObject] = React.useState([]);

  const [liked,setLiked] = React.useState(false);
  const [disliked,setDisliked] = React.useState(false);

  /*React.useEffect(() => {
    if(!currentUser) return;

    const db = getDatabase(app);
    const userTasksRef = ref(db, `users/${currentUser.uid}/appreciatedPosts/${props.postKey}/`);

    const unsubscribe = onValue(userTasksRef, (snapshot) => {
      if(snapshot.exists()){
        const dbObjData = snapshot.val();
        console.log(dbObjData);
        const finalObj = Object.entries(dbObjData);

        setDbObject(finalObj);
      }else{
        setDbObject({});
      }
    }, (error) => {
      console.log('Error fetching tasks: ', error);
    });

    return () => unsubscribe();
  }, [currentUser]);*/

  console.log(dbObject[0]);
  console.log(typeof dbObject[0]);

  const tags = props.tags || {};
  
  function hasNoTags(){
    return !tags.ai && !tags.productivity && !tags.mentalHealth && !tags.learning && !tags.fitness && (!tags.moreTags || tags.moreTags === '');
  }

  async function updateUserInteraction(amount,type){

    const db = getDatabase(app);
    const postRef = ref(db, `posts/${props.postKey}`);
    const userRef = ref(db,`users/${currentUser.uid}/appreciatedPosts/${props.postKey}`);

    try{
      const obj = type === 'likes' ? {likes:amount} : {dislikes:amount};
      const app = {liked: liked,disliked: disliked};
      console.log()
      await set(userRef,app);
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