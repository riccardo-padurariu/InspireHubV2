import React from "react";
import '../Styles/AddTaskModal.css';
import cross from '../Assets/material-symbols_close-rounded.svg';
import backImg from '../Assets/Saly-26.svg';
import { useAuth } from "../Authentification/AuthContext";
import { Database, getDatabase } from "firebase/database";
import { ref,get } from "firebase/database";
import { push,set } from "firebase/database";
import { app } from "../Authentification/Firebase";

export default function AddTaskModal(props) {

  const { currentUser } = useAuth();

  const [isChecked,setIsChecked] = React.useState(false);

  const [idArr,setIdArr] = React.useState([]);

  const fetchData = async () => {
    const db = getDatabase(app);
    const userRef = ref(db, `users/${currentUser.uid}/tasks`);
    const date = new Date();
    const newTask = {
      name: props.taskName,
      description: isChecked ? props.target : props.taskDescription,
      isTarget: isChecked,
      dueDate: String(props.taskDate),
      isCompleted: false,
      id: currentUser.displayName,
      status: 1,
      currentTarget: 0
    };
    
    await push(userRef, newTask);
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

  function addTask(){
    if(handleErrors()){
      props.setTaskList(oldArr => [...oldArr,
          {
              name: props.taskName,
              description: isChecked ? props.target : props.taskDescription,
              isTarget: isChecked,
              dueDate: String(props.taskDate),
              isCompleted: false,
              id: currentUser.displayName,
              status: 1,
              currentTarget: 0
          }
      ]);

      fetchData().catch(error => {
          console.error("Error saving task to Firebase:", error);
      });

      props.setIsAdding(false);
      props.setTaskName('');
      props.setTaskDate('');
      props.setTaskDescription('');
    }
  }

  const fetchDataEdit = async () => {
    const db = getDatabase(app);
    const userRef = ref(db, `users/${currentUser.uid}/tasks`);
    const snapshot = await get(userRef);
    if(snapshot.exists()){
      const myData = snapshot.val();
      const temporaryArray = Object.keys(myData).map( firebaseId => {
        return {
          ...myData[firebaseId],
          id: firebaseId
        }
      })
      setIdArr(temporaryArray);
    }
  }

  React.useEffect(() => {fetchDataEdit()},[props.taskList]);

  //fetchDataEdit();

  //console.log(idArr);

  function editTaskModal() {

    fetchDataEdit();
    
    const arr = props.taskList;
    arr[props.editIndex-1] = {
      name: props.taskName,
      description: isChecked ? props.target : props.taskDescription,
      isTarget: isChecked,
      dueDate: String(props.taskDate),
      isCompleted: false,
      id: currentUser.displayName,
      status: 1,
      currentTarget: 0
    }

    const db = getDatabase(app);
    const userRef = ref(db, `users/${currentUser.uid}/tasks/${idArr[props.editIndex-1].id}`);
    const date = new Date();
    const newTask = {
      name: props.taskName,
      description: isChecked ? props.target : props.taskDescription,
      isTarget: isChecked,
      dueDate: String(props.taskDate),
      isCompleted: false,
      id: currentUser.displayName,
      status: 1,
      currentTarget: 0
    };
    
    set(userRef, newTask);
    
    props.setIsAdding(false);
  }

  console.log(isChecked);

  /* Error handling before fetching the data to firebase */
  function handleErrors() {
    let isOk = true;
    if(props.taskName === ''){
      document.querySelector('.error-name').style.opacity = 1;
      setTimeout(() => {
        document.querySelector('.error-name').style.opacity = 0;
      },7000)
      isOk = false;
    }
    if(!isChecked && props.taskDescription === ''){
      document.querySelector('.error-desc').style.opacity = 1;
      setTimeout(() => {
        document.querySelector('.error-desc').style.opacity = 0;
      },7000)
      isOk = false;
    }else if(isChecked && props.target === 0){
      document.querySelector('.error-desc').style.opacity = 1;
      setTimeout(() => {
        document.querySelector('.error-desc').style.opacity = 0;
      },7000)
      isOk = false;
    }
    if(props.taskDate === ''){
      document.querySelector('.error-hour').style.opacity = 1;
      setTimeout(() => {
        document.querySelector('.error-hour').style.opacity = 0;
      },7000)
      isOk = false;
    }
    
    return isOk;
  }

  return (
    <div className="add-task-div" style={props.isAdding ? styleOnAdding : styleOnNormal}>
      <div className="add-task-modal-container">
        <div className="title-exit-button">
          <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
            <p className="add-task-title">Set your daily goals</p>
            <label className="switch">
              <input checked={isChecked} onChange={() => setIsChecked(!isChecked)} type="checkbox"></input>
              <span className="slider round"></span>
            </label>
            <p className="switch-p">{isChecked ? 'Switch to normal task' : 'Switch to target task'}</p>
          </div>
          <button className="exit-button" onClick={() => {props.setIsAdding(false)}}>
            <img className="cross-img" src={cross}></img>
          </button>
        </div>
        <div className="info-img-div">
          <div className="infos">
            <div className="add-task-input-div">
            <div className="label-and-error">
                <p className="label-add-task">Goal name</p>
                <p className="error-task error-name">*Enter a goal name!</p>
              </div>
              <input className="input-add-task name-modal" type="text" placeholder="Set your goal name" value={props.taskName} onChange={(e) => props.setTaskName(e.target.value)}></input>
            </div>
            <div className="add-task-input-div">
            <div className="label-and-error">
            <p className="label-add-task">{isChecked ? 'Goal Target' : 'Goal Description'}</p>
                <p className="error-task error-desc">{`*Enter a goal ${isChecked ? 'target' : 'description'}!`}</p>
              </div>
              
              {isChecked 
              ? <div className="target">
                  <p className="target-p">{props.target}</p>
                  <button className="change" onClick={() => props.setTarget(props.target+1)}>+</button>
                  <button className="change" onClick={() => props.setTarget(props.target > 0 ? props.target-1 : props.target)}>-</button>
                </div> 
              : <input className="input-add-task-description desc" type="text" placeholder="Set your goal description" value={props.taskDescription} onChange={(e) => props.setTaskDescription(e.target.value)}></input>}
            </div>
            <div className="add-task-input-div">
            <div className="label-and-error">
                <p className="label-add-task">Due Hour</p>
                <p className="error-task error-hour">*Enter a due hour!</p>
              </div>
              <input className="input-add-task date" type="time" value={props.taskDate} onChange={(e) => props.setTaskDate(e.target.value)}></input>
            </div>
            <button className="add-task-modal-button" onClick={props.isEditing ? editTaskModal : addTask}>{props.isEditing ? "EDIT TASK" : "ADD TASK"}</button>
          </div>
          <img className="info-img" src={backImg}></img>
        </div>
      </div>
    </div>
  );
}