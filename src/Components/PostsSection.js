import React from "react";
import '../Styles/PostsSection.css';
import search from '../Assets/Search-icon.svg';
import Post from "./Post";
import { useAuth } from "../Authentification/AuthContext";
import { Database, getDatabase, onValue } from "firebase/database";
import { ref,get,push,set } from "firebase/database";
import ProgressBar from "./ProgressBar";
import { app } from "../Authentification/Firebase";

export default function PostsSection(props){

  const { currentUser } = useAuth();

  const arr = props.postsList;
  const displayArr = arr.map((item) => 
    <Post 
      name={item.postName}
      description={item.postDescription}
      tags={item.tags}
      likes={item.likes}
      dislikes={item.dislikes}
      user={item.user}
    />
  )

  React.useEffect(() => {
    if(!currentUser) return;

    const db = getDatabase(app);
    const userTasksRef = ref(db, `posts`);

    const unsubscribe = onValue(userTasksRef, (snapshot) => {
      if(snapshot.exists()){
        const taskData = snapshot.val();

        const tasksArray = Object.entries(taskData).map(([key,value]) => ({
          ...value,
          firebaseKey: key
        }))

        props.setPostsList(tasksArray);
      }else{
        props.setPostsList([]);
      }
    }, (error) => {
      console.log('Error fetching tasks: ', error);
    });

    return () => unsubscribe();
  }, [currentUser]);


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
        <button className="create-post-button" onClick={() => {props.setIsAddingPost(true)}}>Create A Post</button>
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
        {displayArr}
      </div>
    </div>
  );
}