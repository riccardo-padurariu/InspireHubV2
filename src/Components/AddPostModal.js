import React from "react";
import '../Styles/AddTaskModal.css';
import cross from '../Assets/material-symbols_close-rounded.svg';
import backImg from '../Assets/Saly-26.svg';
import { useAuth } from "../Authentification/AuthContext";
import { Database, getDatabase, set } from "firebase/database";
import { ref,get } from "firebase/database";
import img from '../Assets/1 1.svg';
import filled from '../Assets/star-filled.svg';
import empty from '../Assets/star-empty.svg';
import Tag from "./Tag";
import { app } from "../Authentification/Firebase";
import { push } from "firebase/database";
import arrow from '../Assets/line-md_arrow-down.png';
import TextEditor from "./TextEditor";
import { doc } from "firebase/firestore";

export default function AddPostModal(props) {

  /* Destructuring the current user */
  const { currentUser } = useAuth();
  
  /* Random states */
  const [ai,setAi] = React.useState(false);
  const [productivity,setProductivity] = React.useState(false);
  const [mentalHealth,setMentalHealth] = React.useState(false);
  const [learning,setLearning] = React.useState(false);
  const [fitness,setFitness] = React.useState(false);
  const [tag,setTag] = React.useState('');
  const [idArr,setIdArr] = React.useState([]);

  /* Function to add the post to firebase */
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
        fitness: fitness,
        moreTags: props.postMoreTags
      },
      likes: 0,
      dislikes: 0,
      user: currentUser.displayName
    };
    
      await push(userRef,newPost);
      const postFirebaseKey = userRef;
      console.log(postFirebaseKey);
  }

  /* Adding the post in the post list */
  function addPost(){
    if(handleErrors()){// We use the error handling function
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

      props.setPostName('');
      props.setPostDescription('');
      props.setIsAddingPost(false);
      setAi(false);
      setProductivity(false);
      setMentalHealth(false);
      setLearning(false);
      setFitness(false);
      props.setMoreTags(false);
  }
}
  
  /* The toggle styles for the modal */
  const styleOnAdding = {
    backdropFilter: 'blur(10px)',
    zIndex: 1000,
    position: 'fixed',
    left: 0,
    opacity: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
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

  /* Error handling before fetching the data to firebase */
  function handleErrors() {
    let isOk = true;
    if(props.postName === ''){
      document.querySelector('.error-name').style.opacity = 1;
      setTimeout(() => {
        document.querySelector('.error-name').style.opacity = 0;
      },7000)
      isOk = false;
    } else if(props.postName.length < 6){
      document.querySelector('.error-name').innerHTML = '*Enter a post title of at least 6 characters!';
      document.querySelector('.error-name').style.opacity = 1;
      setTimeout(() => {
        document.querySelector('.error-name').style.opacity = 0;
        document.querySelector('.error-name').innerHTML = '*Enter a post title!';
      },7000)
      isOk = false;
    }
    if(props.postDescription === ''){
      document.querySelector('.error-desc').style.opacity = 1;
      setTimeout(() => {
        document.querySelector('.error-desc').style.opacity = 0;
      },7000)
      isOk = false;
    }else if(props.postDescription.length < 20){
      document.querySelector('.error-desc').innerHTML = '*Enter a post content of at least 20 characters!';
      document.querySelector('.error-desc').style.opacity = 1;
      setTimeout(() => {
        document.querySelector('.error-desc').style.opacity = 0;
        document.querySelector('.error-desc').innerHTML = '*Enter a post content!';
      },7000)
      isOk = false;
    }
    return isOk;
  }


  /* The HTML element */
  return (
    <div className="add-task-div" style={props.isAddingPost ? styleOnAdding : styleOnNormal}>
      <div className="add-task-modal-container" style={{height: '550px',width: '1000px',overflowY: 'auto',overflowX: 'hidden'}}>
        <div className="title-exit-button">
          <p className="add-task-title">Share your ideas with our community!</p>
          <button className="exit-button" onClick={() => {props.setPostMoreTags('');props.setIsAddingPost(false)}}>
            <img className="cross-img" src={cross}></img>
          </button>
        </div>
        <div className="info-img-div" style={{marginLeft: '30px'}}>
          <div className="infos">
            <div className="add-task-input-div">
              <div className="label-and-error">
                <p className="label-add-task">Post title</p>
                <p className="error-task error-name">*Enter a post title!</p>
              </div>
              <input style={{width: '500px'}} className="input-add-task name-modal" type="text" placeholder="Set your post title" value={props.postName} onChange={(e) => props.setPostName(e.target.value)}></input>
            </div>
            <div className="add-task-input-div">
            <div className="label-and-error">
                <p className="label-add-task">Post content</p>
                <p className="error-task error-desc">*Enter a post content!</p>
              </div>
              <TextEditor value={props.postDescription} setValue={props.setPostDescription}/>
            </div>
            <p className="label-add-task">Add tags</p>
            <div className="tags-modal-div" style={{width: '610px'}}>
              <div className="tags-sec-div" style={{width: '650px'}}>
                <Tag set={setAi} name="AI" status= {ai ? "selected" : "normal"} />
                <Tag set={setProductivity} name="Productivity" status= {productivity ? "selected" : "normal"} />
                <Tag set={setMentalHealth} name="Mental Health" status= {mentalHealth ? "selected" : "normal"} />
                <Tag set={setLearning} name="Learning" status= {learning ? "selected" : "normal"} />
                <Tag set={setFitness} name="Fitness" status= {fitness ? "selected" : "normal"} />
                {!props.moreTags && <Tag set={props.setMoreTags} name={props.postMoreTags==='' ? "Another" : props.postMoreTags} status= {props.postMoreTags!=='' ? "selected" : "normal"}/>}
                {props.moreTags && 
                <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
                  <input value={props.postMoreTags} onChange={(e) => props.setPostMoreTags(e.target.value)} className="input-more-tags" placeholder="Enter tag name" type="text"></input>
                  <div onClick={() => {props.setPostMoreTags('');props.setMoreTags(false)}} style={{cursor:'pointer',background: 'black', borderRadius: '50%',padding: '8px 8px 4px 8px',marginLeft: '3px'}}><img src={arrow}></img></div>
                  <button className="add-tag-button" onClick={() => props.setMoreTags(false)}> Add tag</button>
                </div>}
              </div>
            </div>
            <button className="add-task-modal-button" style={{fontSize: '11px',marginTop: '10px'}} onClick={addPost}>CREATE POST</button>
          </div>
          <img className="info-img" src={img} style={{marginTop: '60px'}}></img>
        </div>
      </div>
    </div>
  );
}