import React from "react";
import Sidebar from "../Components/Sidebar";
import back from '../Assets/Background.svg';
import Quote from "../Components/Quote";
import ToDoList from "../Components/ToDoList";
import AddTaskModal from "../Components/AddTaskModal";
import { Database, getDatabase } from "firebase/database";
import { useAuth } from "../Authentification/AuthContext";
import PopUpNotification from "../Components/PopUpNotification";
import { ref,get } from "firebase/database";
import { push,set } from "firebase/database";
import { app } from "../Authentification/Firebase";

export default function ToDoListPage(props) {

  const { userLoggedIn } = useAuth();

  const [taskList,setTaskList] = React.useState([]);
  const [isAdding,setIsAdding] = React.useState(false);

  const [taskName,setTaskName] = React.useState('');
  const [taskDescription,setTaskDescription] = React.useState('');
  const [taskDate,setTaskDate] = React.useState('');
  const [target,setTarget] = React.useState(0);
  const [isEditing,setIsEditing] = React.useState(false);
  const [editIndex,setEditIndex] = React.useState(0);
  const [pageSelector,setPageSelector] = React.useState({
    home: true,
    challenges: false,
    community: false,
    aiChatbot: false,
    setting: false
  })


  if(window.location.href === 'http://localhost:3000/home')
    document.body.style.overflow = "";
  else
    document.body.style.overflow = "hidden";

    let h1 = pageSelector.home ? 242 : 100;

    window.addEventListener('resize', function() {
      document.querySelector('.sidebar').style.height = window.innerHeight-255 + "px";
      document.querySelector('.todolist-container').style.height = window.innerHeight-h1 + "px";
      document.querySelector('.features-dash').style.height = window.innerHeight-61 + "px";
      document.querySelector('.task-list-container').style.height = window.innerHeight-445 + "px";
    });

  return (
    <div className="dashboard-container">
      <img className="back" src={back}></img>
      <Sidebar setNeedsOverFlow={props.setNeedsOverFlow} setPageSelector={setPageSelector} pageSelector={pageSelector}/>
      <div className="features-dash" style={{ height: `${window.innerHeight-61}px`}}> 
        <Quote />
        <ToDoList
          taskList={taskList} 
          setIsAdding={setIsAdding} 
          setTaskList={setTaskList}
          setTaskName={setTaskName}
          setTaskDescription={setTaskDescription}
          setTaskDate={setTaskDate}
          setIsEditing={setIsEditing}
          setEditIndex={setEditIndex}
          h1 = {h1}
          editIndex={editIndex}
          target={target}
          setTarget={setTarget}
         />
      </div>
      <AddTaskModal
        taskList={taskList}
        setTaskList={setTaskList} 
        isAdding={isAdding} 
        setIsAdding={setIsAdding}
        setTaskName={setTaskName}
        setTaskDescription={setTaskDescription}
        setTaskDate={setTaskDate}
        taskName={taskName}
        taskDescription={taskDescription}
        taskDate={taskDate}
        isEditing={isEditing}
        editIndex={editIndex}
        target={target}
        setTarget={setTarget}
      />
    </div>
  );
}