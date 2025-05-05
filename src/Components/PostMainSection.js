import React from "react";
import '../Styles/PostMainSection.css';
import img from '../Assets/User.svg';
import img2 from '../Assets/up-and-down.svg';
import { useAuth } from "../Authentification/AuthContext";
import { app } from "../Authentification/Firebase";
import { getDatabase,ref,onValue,update,push  } from "firebase/database";
import Comment from "./Comment";
import down from '../Assets/down.svg';
import up from '../Assets/up.svg';
import { remove } from "firebase/database";

export default function PostMainSection(props){

  const { currentUser } = useAuth();

  const [post,setPost] = React.useState({});
  const [isPosting,setIsPosting] = React.useState(false);
  const [comment,setComment] = React.useState('');
  const [liked,setLiked] = React.useState(false);
  const [disliked,setDisliked] = React.useState(false);
  const [replyArray,setReplyArray] = React.useState([]);
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

  /* Updating in the database the user interaction with the post based on the function paramaters*/
  async function updateUserInteraction(amount,type){

    const db = getDatabase(app);
    const postRef = ref(db, `posts/${props.postKey}`);
    const postRef2 = ref(db,`posts/${props.postKey}/likedBy`);
    const postRef3 = ref(db,`posts/${props.postKey}/dislikedBy`);

    try{
      const obj = type === 'likes' ? {likes: amount} : {dislikes: amount};
      await update(postRef,obj);

      if(type === 'likes'){
        if(amount > post.likes){
          await push(postRef2,currentUser.uid);

          const dislikedId = existsInArray(dislikedBy,currentUser.uid);
          if(dislikedId.exists){
            const deleteRef = ref(db,`posts/${props.postKey}/dislikedBy/${dislikedId.index}`);
            await remove(deleteRef);
          }
        } else {
          const likedId = existsInArray(likedBy,currentUser.uid);
          if(likedId.exists){
            const deleteRef = ref(db,`posts/${props.postKey}/likedBy/${likedId.index}`);
            await remove(deleteRef);
          }
        }
      } else if(type === 'dislikes') {
        if(amount > post.dislikes){
          await push(postRef3,currentUser.uid);

          const likedId = existsInArray(likedBy,currentUser.uid);
          if(likedId.exists){
            const deleteRef = ref(db,`posts/${props.postKey}/likedBy/${likedId.index}`);
            await remove(deleteRef);
          }
        } else {
          const dislikedId = existsInArray(dislikedBy,currentUser.uid);
          if(dislikedId.exists){
            const deleteRef = ref(db,`posts/${props.postKey}/dislikedBy/${dislikedId.index}`);
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
      updateUserInteraction(post.likes+1,'likes');
      setLiked(true);
      if(disliked){
        setDisliked(false);
        updateUserInteraction(post.dislikes-1,'dislikes');
      }
    }else {
      updateUserInteraction(post.likes-1,'likes');
      setLiked(false);
    }
  }

  function dislike(){
    if(!disliked){
      setDisliked(true);
      updateUserInteraction(post.dislikes+1,'dislikes');
      if(liked){
        setLiked(false);
        updateUserInteraction(post.likes-1,'likes');
      }
    }else{
      setDisliked(false);
      updateUserInteraction(post.dislikes-1,'dislikes');
    }
  }

  React.useEffect(() => {
    if(!currentUser) return;

    const db = getDatabase(app);
    const userTasksRef = ref(db, `posts/${props.postKey}`);

    const unsubscribe = onValue(userTasksRef, (snapshot) => {
      if(snapshot.exists()){
        const postData = snapshot.val();

        const postObj = postData;


        setPost(postObj);
      }else{
        setPost({});
      }
    }, (error) => {
      console.log('Error fetching tasks: ', error);
    });

    return () => unsubscribe();
  }, [props.postKey]);


  React.useEffect(() => {
    if(!currentUser) return;

    const db = getDatabase(app);
    const commentsTasksRef = ref(db, `posts/${props.postKey}/comments`);

    const unsubscribe = onValue(commentsTasksRef, (snapshot) => {
      if(snapshot.exists()){
        const commentsData = snapshot.val();
        console.log(commentsData);

        const commentsArr = Object.entries(commentsData).map(([key,value]) => ({
          ...value,
          firebaseKey: key
        }))

        props.setCommentsArray(commentsArr);
      }else{
        props.setCommentsArray([]);
      }

      console.log(props.commentsArray);
    }, (error) => {
      console.log('Error fetching tasks: ', error);
    });

    return () => unsubscribe();
  }, [props.postKey]);


  const tags = post.tags || {};
  
  function hasNoTags(){
    return !tags.ai && !tags.productivity && !tags.mentalHealth && !tags.learning && !tags.fitness && (!tags.moreTags || tags.moreTags === '');
  }

  window.addEventListener('resize', function() {
    document.querySelector('.post-main-section-container').style.height = window.innerHeight-275 + "px";
  });

  

  async function fetchData() {
    const db = getDatabase(app);
    const postRef = ref(db, `posts/${props.postKey}/comments`);
    const date = new Date();
    const dateStr = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`
    const newComment = {
      user: currentUser.displayName,
      content: comment,
      likes: 0,
      dislikes: 0,
      date: dateStr
    };
    
    await push(postRef, newComment);
  }

  function postComment(){
    fetchData().catch(error => console.error(error));

    setComment('');
    setIsPosting(false);
  }

  return (
    <div className="post-main-section-container" style={{height: window.innerHeight-275 + "px",overflow: 'auto'}}>
      <div className="general-infos">
        <div className="pfp-main-post">
          <img src={img} ></img>
        </div>
        <div className="main-post-infos">
          <div className="infos">
            <div>
              <div className="main-post-info">
                <p style={{cursor: 'pointer',fontSize: '22px',margin: '0 10px'}} className="post-title" onClick={() => window.location = `/dashboard/community/${props.postKey}`}>{post.postName}</p>
              </div>
              <p className="user-poster" style={{fontSize: '18px'}}>Posted by: {post.user}</p>
              <div className="tags">
                {hasNoTags() ? <p style={{marginLeft: '10px',fontSize: '18px'}} className="tags-post-title">No tags </p> : <p style={{marginLeft: '10px',fontSize: '18px'}} className="tags-post-title">Tags: </p>}
                {tags.ai && <div className="tag">AI</div>}
                {tags.productivity && <div className="tag">Productivity</div>}
                {tags.mentalHealth && <div className="tag">Mental Health</div>}
                {tags.learning && <div className="tag">Learning</div>}
                {tags.fitness && <div className="tag">Fitness</div>}
                {tags.moreTags && <div className="tag">{tags.moreTags}</div>}
              </div>
            </div>
            <div className="main-post-stats">
              <img onClick={dislike} style={{cursor: 'pointer'}} src={down}></img>
              <p className="stats-main-p">{post.dislikes}/{post.likes}</p>
              <img onClick={like} style={{cursor:'pointer'}} src={up}></img>
            </div>
          </div>

        </div>
      </div>
      <div className="post-main-description">
        <p dangerouslySetInnerHTML={{__html: `<p className="description-p">${post.postDescription}</p>`}} className="post-main-description-p"></p>
      </div>
      <div className="post-main-comments">
        <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',marginBottom: isPosting ? '0' : '20px'}}>
          <p className="post-main-comments-p">Comments</p>
          <button className="add-comment-button" onClick={() => {setIsPosting(true);setComment('');}}>+ Add comment</button>
        </div>
        <div style={{display: isPosting ? 'flex' : 'none',flexDirection: 'row',marginTop: '12px',marginBottom:'20px'}}>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} style={{wordWrap: 'break-word',resize: 'none'}} className="input-comment" rows="6" cols="40" placeholder="Add a comment..."></textarea>
          <button className="post-comment-button" onClick={postComment}>Post comment</button>
          <button className="post-comment-button" onClick={() => setIsPosting(false)}>Exit</button>
        </div>
        {props.commentsArray.map((item) => 
          <Comment 
            user={item.user}
            likes={item.likes}
            dislikes={item.dislikes}
            content={item.content}
            date={item.date}
            replyArray={replyArray}
            setReplyArray={setReplyArray}
            postKey={props.postKey}
            commentKey={item.firebaseKey}
          />
        )}
      </div>
    </div>
  );
}