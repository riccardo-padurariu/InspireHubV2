import React from "react";
import '../Styles/PostMainSection.css';
import img from '../Assets/User.svg';
import img2 from '../Assets/up-and-down.svg';
import { useAuth } from "../Authentification/AuthContext";
import { app } from "../Authentification/Firebase";
import { getDatabase,ref,onValue,update  } from "firebase/database";

export default function PostMainSection(props){

  const [post,setPost] = React.useState({});

  const [isPosting,setIsPosting] = React.useState(false);

  const { currentUser } = useAuth();

  const [liked,setLiked] = React.useState(false);
  const [disliked,setDisliked] = React.useState(false);

  React.useEffect(() => {
    if(!currentUser) return;

    const db = getDatabase(app);
    const userTasksRef = ref(db, `posts/${props.postKey}`);

    const unsubscribe = onValue(userTasksRef, (snapshot) => {
      if(snapshot.exists()){
        const postData = snapshot.val();

        const postObj = postData;


        setPost(postObj);
        //console.log(postObj);
        //console.log(postData);
      }else{
        setPost({});
      }
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

  async function updateUserInteraction(amount,type){
  
      const db = getDatabase(app);
      const postRef = ref(db, `posts/${props.postKey}`);
      const userRef = ref(db,`users/${currentUser.uid}/appreciatedPosts/${props.postKey}`);
  
      try{
        const obj = type === 'likes' ? {likes:amount} : {dislikes:amount};
        const app = {liked: liked,disliked: disliked};
        console.log()
        //await set(userRef,app);
        await update(postRef,obj);
        //alert('Updated');
      }catch(error){
        console.log('Error updating status: ',error);
      }
    }
  
    function like(){
      if(!liked){
        setLiked(true);
        updateUserInteraction(post.likes+1,'likes');
        if(disliked){
          setDisliked(false);
          updateUserInteraction(post.dislikes-1,'dislikes');
        }
      }else {
        setLiked(false);
        updateUserInteraction(post.likes-1,'likes');
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
              <img onClick={dislike} style={{cursor: 'pointer'}} src={img2}></img>
              <p className="stats-main-p">{post.dislikes}/{post.likes}</p>
              <img onClick={like} style={{rotate: '180deg',cursor:'pointer'}} src={img2}></img>
            </div>
          </div>

        </div>
      </div>
      <div className="post-main-description">
        <p className="post-main-description-p">{post.postDescription}</p>
      </div>
      <div className="post-main-comments">
        <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between'}}>
          <p className="post-main-comments-p">Comments</p>
          <button className="add-comment-button" onClick={() => setIsPosting(true)}>+ Add comment</button>
        </div>
        <div style={{display: isPosting ? 'flex' : 'none',flexDirection: 'row',marginTop: '12px'}}>
          <textarea style={{wordWrap: 'break-word',resize: 'none'}} className="input-comment" rows="6" cols="40" placeholder="Add a comment..."></textarea>
          <button className="post-comment-button">Post comment</button>
          <button className="post-comment-button" onClick={() => setIsPosting(false)}>Exit</button>
        </div>
      </div>
    </div>
  );
}