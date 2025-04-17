import React from "react";
import '../Styles/AddTaskModal.css';
import cross from '../Assets/material-symbols_close-rounded.svg';
import backImg from '../Assets/Saly-26.svg';
import { useAuth } from "../Authentification/AuthContext";
import { Database, getDatabase } from "firebase/database";
import { ref,get } from "firebase/database";
import img from '../Assets/1 1.svg';
import filled from '../Assets/star-filled.svg';
import empty from '../Assets/star-empty.svg';
import Tag from "./Tag";
import { app } from "../Authentification/Firebase";
import { push } from "firebase/database";

export default function AddPostModal(props) {

  const { currentUser } = useAuth();

  const [ai,setAi] = React.useState(false);
  const [productivity,setProductivity] = React.useState(false);
  const [mentalHealth,setMentalHealth] = React.useState(false);
  const [learning,setLearning] = React.useState(false);
  const [fitness,setFitness] = React.useState(false);

  const [idArr,setIdArr] = React.useState([]);

  const fetchData = async () => {
    const db = getDatabase(app);
    const userRef = ref(db, `posts`);
    const newPost = {
      postName: props.postName,
      postDescription: props.postDescription,
      tags: {
        ai: ai,
        productivity: productivity,
        mentalHealth: mentalHealth,
        learning: learning,
        fitness: fitness
      },
      likes: 0,
      dislikes: 0,
      user: currentUser.displayName
    };
    
    await push(userRef, newPost);
  }

  function addTask(){
    props.setPostsList(oldArr => [...oldArr,
        {
            postName: props.postName,
            postDescription: props.postDescription,
            tags: {
              ai: ai,
              productivity: productivity,
              mentalHealth: mentalHealth,
              learning: learning,
              fitness: fitness
            },
            likes: 0,
            dislikes: 0,
            user: currentUser.displayName
        }
    ]);

    fetchData().catch(error => {
        console.error("Error saving task to Firebase:", error);
    });

    props.setIsAddingPost(false);
    props.setPostName('');
    props.setPostDescription('');
  }
  

  const styleOnAdding = {
    backdropFilter: 'blur(10px)',
    zIndex: 1000,
    position: 'fixed',
    //marginLeft: '-1510px',
    left: 0,
    opacity: 1,
    //width: '1520px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  }

  const styleOnNormal = {
    backdropFilter: 'blur(10px)',
    zIndex: -1,
    position: 'relative',
    marginLeft: '-1510px',
    opacity: 0,
    width: '1520px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }

  return (
    <div className="add-task-div" style={props.isAddingPost ? styleOnAdding : styleOnNormal}>
      <div className="add-task-modal-container" style={{width: '1000px'}}>
        <div className="title-exit-button">
          <p className="add-task-title">Share your ideas with our community!</p>
          <button className="exit-button" onClick={() => {props.setIsAddingPost(false)}}>
            <img className="cross-img" src={cross}></img>
          </button>
        </div>
        <div className="info-img-div" style={{marginLeft: '30px'}}>
          <div className="infos">
            <div className="add-task-input-div">
              <p className="label-add-task">Post title</p>
              <input style={{width: '500px'}} className="input-add-task name-modal" type="text" placeholder="Set your post title" onChange={(e) => props.setPostName(e.target.value)}></input>
            </div>
            <div className="add-task-input-div">
              <p className="label-add-task">Post content</p>
              <textarea rows="6" style={{wordWrap: 'break-word',resize: 'none',width: '510px'}} className="input-add-task-description desc" type="text" placeholder="Tell us about your experience" onChange={(e) => props.setPostDescription(e.target.value)}></textarea>
            </div>
            <p className="label-add-task">Add tags</p>
            <div className="tags-modal-div">
              <div className="tags-sec-div">
                <Tag set={setAi} name="AI" status= {ai ? "selected" : "normal"} />
                <Tag set={setProductivity} name="Productivity" status= {productivity ? "selected" : "normal"} />
                <Tag set={setMentalHealth} name="Mental Health" status= {mentalHealth ? "selected" : "normal"} />
                <Tag set={setLearning} name="Learning" status= {learning ? "selected" : "normal"} />
                <Tag set={setFitness} name="Fitness" status= {fitness ? "selected" : "normal"} />
              </div>
            </div>
            <button className="add-task-modal-button" style={{fontSize: '11px',marginTop: '10px'}} onClick={addTask}>CREATE POST</button>
          </div>
          <img className="info-img" src={img} style={{marginTop: '60px'}}></img>
        </div>
      </div>
    </div>
  );
}