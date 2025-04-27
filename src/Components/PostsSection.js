import React from "react";
import '../Styles/PostsSection.css';
import searchimg from '../Assets/Search-icon.svg';
import Post from "./Post";
import { useAuth } from "../Authentification/AuthContext";
import { Database, getDatabase, onValue } from "firebase/database";
import { ref,get,push,set } from "firebase/database";
import ProgressBar from "./ProgressBar";
import { app } from "../Authentification/Firebase";

export default function PostsSection(props){

  const [search,setSearch] = React.useState('');

  const { currentUser } = useAuth();

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


  const [filter,setFilter] = React.useState({
    all: true,
    ai: false,
    productivity: false,
    mentalHealth: false,
    learning: false,
    fitness: false,
    moreTags: false
  });

  const arr = props.postsList;

  function filterTag(tag){
    if(filter.ai){
      return tag.tags.ai;
    }else if(filter.fitness){
      return tag.tags.fitness;
    }else if(filter.learning){
      return tag.tags.learning;
    }else if(filter.mentalHealth){
      return tag.tags.mentalHealth;
    }else if(filter.productivity){
      return tag.tags.productivity;
    }else if(filter.all){
      return true;
    }else if(filter.moreTags){
      return !(!tag.tags.moreTags || tag.tags.moreTags === '');
    }
  }

  const filtArr = arr.filter(filterTag);



  const displayArr = filtArr.filter((item) => {
    return search.toLowerCase() === '' ? item : item.postName.toLowerCase().includes(search);
  }).map((item,index) => 
    <Post 
      name={item.postName}
      description={item.postDescription}
      tags={item.tags}
      likes={item.likes}
      dislikes={item.dislikes}
      user={item.user}
      postKey={item.firebaseKey}
    />
  )

  function handleCreatePost() {
    props.setPostName('');
    props.setPostDescription('');
    props.setIsAddingPost(true);
    props.setMoreTags(false);
  }

  //function searchPost() 
  //}

  window.addEventListener('resize', function() {
    document.querySelector('.post-section-container').style.height = window.innerHeight-305 + "px";
  });

  return(
    <div className="post-section-container" style={{height: window.innerHeight-305 + "px", overflow: 'auto'}}>
      <div className="post-board">
        <div className="post-input">
          <input className="search-post-input" onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search for a post"></input>
          <button className="search-post-button">
            <img src={searchimg}></img>
          </button>
        </div>
        <button className="create-post-button" onClick={handleCreatePost}>Create A Post</button>
      </div>
      <div className="tags-container">
        <div onClick={() => setFilter({
          all: true,
          ai: false,
          productivity: false,
          mentalHealth: false,
          learning: false,
          fitness: false,
          moreTags: false
        })} className={`tag ${filter.all ? 'selected' : ''}`}>
          All tags
        </div>
        <div onClick={() => setFilter({
          all: false,
          ai: true,
          productivity: false,
          mentalHealth: false,
          learning: false,
          fitness: false,
          moreTags: false
        })} className={`tag ${filter.ai ? 'selected' : ''}`}>
          AI
        </div>
        <div onClick={() => setFilter({
          all: false,
          ai: false,
          productivity: true,
          mentalHealth: false,
          learning: false,
          fitness: false,
          moreTags: false
        })} className={`tag ${filter.productivity ? 'selected' : ''}`}>
          Productivity
        </div>
        <div onClick={() => setFilter({
          all: false,
          ai: false,
          productivity: false,
          mentalHealth: true,
          learning: false,
          fitness: false,
          moreTags: false
        })} className={`tag ${filter.mentalHealth ? 'selected' : ''}`}>
          Mental Health
        </div>
        <div onClick={() => setFilter({
          all: false,
          ai: false,
          productivity: false,
          mentalHealth: false,
          learning: true,
          fitness: false,
          moreTags: false
        })} className={`tag ${filter.learning ? 'selected' : ''}`}>
          Learning
        </div>
        <div onClick={() => setFilter({
          all: false,
          ai: false,
          productivity: false,
          mentalHealth: false,
          learning: false,
          fitness: true,
          moreTags: false
        })} className={`tag ${filter.fitness ? 'selected' : ''}`}>
          Fitness
        </div>
        <div onClick={() => setFilter({
          all: false,
          ai: false,
          productivity: false,
          mentalHealth: false,
          learning: false,
          fitness: false,
          moreTags: true
        })} className={`tag ${filter.moreTags ? 'selected' : ''}`}>
          More Tags
        </div>
      </div>
      <div className="posts-container">
        {displayArr}
      </div>
    </div>
  );
}