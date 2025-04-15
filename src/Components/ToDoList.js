import React from "react";
import '../Styles/ToDoList.css';
import Task from "./Task";
import { Database, getDatabase, onValue } from "firebase/database";
import { ref,get,push,set } from "firebase/database";
import ProgressBar from "./ProgressBar";
import { app } from "../Authentification/Firebase";
import { useAuth } from "../Authentification/AuthContext";

export default function ToDoList(props) {

  const { currentUser } = useAuth();

  const [completedList,setCompletedList] = React.useState([]);
  const [indexC,setIndexC] = React.useState(0);

  let completed = 0;
  for(let i=0;i<props.taskList.length;i++){
    if(props.taskList[i].isCompleted)
      completed++;
  }

  React.useEffect(() => {
    if(!currentUser) return;

    const db = getDatabase(app);
    const userTasksRef = ref(db, `users/${currentUser.uid}/tasks`);

    const unsubscribe = onValue(userTasksRef, (snapshot) => {
      if(snapshot.exists()){
        const taskData = snapshot.val();

        const tasksArray = Object.entries(taskData).map(([key,value]) => ({
          ...value,
          firebaseKey: key
        }))

        props.setTaskList(tasksArray);
      }else{
        props.setTaskList([]);
      }
    }, (error) => {
      console.log('Error fetching tasks: ', error);
    });

    return () => unsubscribe();
  }, [currentUser]);


  const arr = props.taskList;
  let i = 1;
  const displayArr = arr.map((item) => <Task
    name = {item.name}
    description = {item.description}
    dueDate = {item.dueDate}
    isCompleted = {item.isCompleted}
    setIsAdding = {props.setIsAdding}
    index = {i++}
    taskList = {props.taskList}
    setTaskList = {props.setTaskList}
    setTaskName={props.setTaskName}
    setTaskDescription={props.setTaskDescription}
    setTaskDate={props.setTaskDate}
    setIsEditing={props.setIsEditing}
    setEditIndex={props.setEditIndex}
    completedList={completedList}
    setCompletedList={setCompletedList}
    firebaseKey={item.firebaseKey}
   />
  );

  function setUpToAdd(){
    props.setTaskName('');
    props.setTaskDate('');
    props.setTaskDescription('');
    props.setIsAdding(true);
    props.setIsEditing(false);
  }



  let result = 0;

  if(props.taskList.length > 0) 
    result =  Math.round(completedList.length / props.taskList.length * 100) 
  else
    result = 0;


  return (
    <div className="todolist-container">
      <p className="todolist-title">Your daily goals</p>
      <div className="progress-bar-div">
        <div className="title-procent">
          <p className="pb-title">Overall progress</p>
          <p className="procent">{result}%</p>
        </div>
        <ProgressBar checked={completed/*completedList.length*/} total={props.taskList.length}/>
        <p className="pb-stats">{completed/*completedList.length*/} of {props.taskList.length} completed</p>
      </div>
      <button className="addtask-button" onClick={setUpToAdd}>+ New Task</button>
      <div className="task-list-container" style={{height: window.innerHeight-445 + "px", overflow: "auto"}}>
        <div className="header-list">
          <p className="section-todolist">Number</p>
          <p className="section-todolist">Goal Name</p>
          <p className="section-todolist">Due Hour</p>
          <p className="section-todolist">Status</p>
        </div>
        {displayArr}
      </div>
    </div>
  );
}