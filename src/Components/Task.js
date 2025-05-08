import React from "react";
import '../Styles/Task.css'
import arr from '../Assets/Arrow up-right.svg';
import { useAuth } from "../Authentification/AuthContext";
import { Database, getDatabase } from "firebase/database";
import { ref,get } from "firebase/database";
import { push,set } from "firebase/database";
import { app } from "../Authentification/Firebase";
import { update } from "firebase/database";
import { remove } from "firebase/database";

export default function Task(props) {

  const { currentUser } = useAuth();
  const [idArr,setIdArr] = React.useState([]);

  const [isExtended,setIsExtended] = React.useState(false);

  const fetchDataDelete = async () => {
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
        console.log(idArr);
      }
    }

  React.useEffect(() => {fetchDataDelete()},[props.taskList]);

  

  const date = new Date();
  const taskH = Number(props.dueDate.slice(2));
  const taskM = Number(props.dueDate.slice(-2));
  if(Number(date.getHours()) > taskH){
    const arr = props.taskList;
    arr[props.index-1] = {
      name: props.taskName,
      description: props.taskDescription,
      dueDate: String(props.taskDate),
      isCompleted: false,
      status: 0
    }
  }else if(Number(date.getMinutes()) > taskM){
    const arr = props.taskList;
    arr[props.index-1] = {
      name: props.taskName,
      description: props.taskDescription,
      dueDate: String(props.taskDate),
      isCompleted: false,
      status: 0
    }
  }

  async function deleteFormDB(taskId){
    const db = getDatabase(app);
    const userRef = ref(db, `users/${currentUser.uid}/tasks/${taskId}`);
    await remove(userRef);
  }

  function deleteTask(taskId) {
    const arr = props.taskList;
    const arrC = props.completedList;
    const newArr = arr.filter((item,index) => index != props.index-1);
    const newArrC = arrC.filter((item,index) => item != props.index-1);
    props.setTaskList(newArr);
    props.setCompletedList(newArrC);

    fetchDataDelete();

    deleteFormDB(taskId);
  }

  function editTask(){
    props.setIsAdding(true);
    props.setTaskName(props.name);
    props.setTaskDescription(props.description)
    props.setTaskDate(props.dueDate)
    props.setIsEditing(true);
    props.setEditIndex(props.index);
  }

  const completedStyle = {
    width: '105px',
    padding: '7px 0px',
    fontFamily: 'Outfit',
    fontSize: '13px',
    backgroundColor: '#0DCB46',
    fontWeight: 600,
    borderRadius: '6px',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginRight: '5px'
  }
  
  const inProgressStyle = {
    width: '105px',
    padding: '7px 0px',
    fontFamily: 'Outfit',
    fontSize: '13px',
    backgroundColor: '#244CA1',
    fontWeight: 600,
    borderRadius: '6px',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginRight: '5px'
  }

  async function updateCompletationStatus(isCompleted){

    if(!currentUser){
      console.error('User not found!');
      return ;
    }
    if(!props.firebaseKey){
      console.error('Key not found');
      return;
    }

    const db = getDatabase(app);
    const taskRef = ref(db, `users/${currentUser.uid}/tasks/${props.firebaseKey}`);

    try{
      await update(taskRef,{ isCompleted: isCompleted});
      //alert('Updated');
    }catch(error){
      console.log('Error updating status: ',error);
    }
  }

  async function updateCurrentTarget(amount){

    if(!currentUser){
      console.error('User not found!');
      return;
    }
    if(!props.firebaseKey){
      console.error('Key not found!');
      return;
    }

    const db = getDatabase(app);
    const taskRef = ref(db,`users/${currentUser.uid}/tasks/${props.firebaseKey}`);

    try{
      await update(taskRef,{currentTarget: amount});
      //alert('Updated');
    }catch(error){
      console.log('Error updating current target: ',error);
    }
  }


  function completeTask() {
    updateCompletationStatus(true);
    const arr = props.taskList;
    arr[props.index-1].isCompleted = true;
    props.setCompletedList(prevList => [...prevList,
      props.index-1, 
    ]);
  }

  function undoTask() {
    updateCompletationStatus(false);
    const arr = props.taskList;
    arr[props.index-1].isCompleted = false;
    const arrC = props.completedList;
    const newArrC = arrC.filter((item,index) => item !== props.index-1)
    props.setCompletedList(newArrC);
  }

  const styleInfosNormal = {
    marginLeft: '-15px',
    marginRight: '35px',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  }

  const styleInfoExtended = {
    marginLeft: '100px',
    marginRight: '35px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'space-around',
    gap: '5px'
  }

  const styleUserButtonsNormal = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  };

  const styleUserButtonsExtended = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  }

  function check(){
    if(props.isTarget){
      if(props.currentTarget === props.description){
        updateCompletationStatus(true);
        const arr = props.taskList;
        arr[props.index-1].isCompleted = true;
        props.setCompletedList(prevList => [...prevList,
          props.index-1, 
        ]);
        //alert('completed');
      }else{
        updateCompletationStatus(false);
        const arr = props.taskList;
        arr[props.index-1].isCompleted = false;
        const arrC = props.completedList;
        const newArrC = arrC.filter((item,index) => item !== props.index-1)
        props.setCompletedList(newArrC);
        //alert('uncompleted');
      }
    }
    console.log(props.currentTarget);
  }

  return (
    <div className="task-main-div">
      <div className="task-container">
        <div style={{display: 'flex',flexDirection: 'column',alignItems: 'start',height: isExtended ? '108px' : ''}}>
          <button onClick={() => setIsExtended(prev => !prev)} className="expand-task-button">
            <img className="arr-task" style={{rotate: isExtended ? '' : '180deg'}} src={arr}></img>
          </button>
        </div>
        <div style={{display: 'flex',flexDirection: 'column', flex: 1,marginRight:isExtended ? '130px' : '-20px'}}>
          <div className="task-info" style={styleInfosNormal}>
            <p className="task-attribute">{isExtended ? `Nr task: ${props.index}` : `${props.index}`}</p>
            <p className="task-attribute task-name" style={{marginLeft: (isExtended ? 0 : 52) + 'px'}}>{`${props.name}`}</p>
            <p className="task-attribute date" style={{marginLeft: (isExtended ? 0 : 10) + 'px'}}>{`${props.dueDate}`}</p>
            {props.isTarget ? <p className={props.currentTarget === props.description ? "target-task-completed" : "target-task"}>{props.currentTarget}/{props.description}</p>  : <p className="task-attribute">{(props.isCompleted ? 'Completed' : (props.status === 0 ? 'Due' : 'In progress'))}</p>}
          </div>
          {isExtended && !props.isTarget && <p className="task-attribute">{`Task description: ${props.description}`}</p>}
          {isExtended && props.isTarget && <p className="task-attribute">{`Task target: ${props.description}`}</p>}
        </div>
        <div className="user-todolist-buttons" style={isExtended ? styleUserButtonsExtended : styleUserButtonsNormal}>
          {props.isTarget
          ? <div style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
              <button className="manage-target-task" onClick={() => {updateCurrentTarget(props.currentTarget > 0 ? props.currentTarget-1 : props.currentTarget);check()}}>-</button>
              <button className="manage-target-task" onClick={() => {updateCurrentTarget(props.currentTarget < props.description ? props.currentTarget+1 : props.currentTarget);check()}}>+</button>
            </div>
          : <button className="complete-task-button" style={props.isCompleted ? completedStyle : inProgressStyle} onClick={props.isCompleted ? undoTask : completeTask}>{props.isCompleted ? 'Undo' : 'Complete'}</button>}
          <button className="edit-button" onClick={editTask}>Edit</button>
          <button className="delete-button" style={{marginRight: '3px'}} onClick={() => deleteTask(idArr[props.index-1].id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}