import React from "react";
import '../Styles/AiPage.css';
import Sidebar from "../Components/Sidebar";
import back from '../Assets/Background.svg';
import Quote from "../Components/Quote";
import ToDoList from "../Components/ToDoList";
import AddTaskModal from "../Components/AddTaskModal";
import AiIntro from "../Components/AiIntro";
import AiChatBot from "../Components/AiChatBot";
import AddFeedback from "../Components/AddFeedback";

export default function AiPage(props){

  const [isAddingFeedback,setIsAddingFeedback] = React.useState(false);
  

  const [taskList,setTaskList] = React.useState([]);
  const [isAdding,setIsAdding] = React.useState(false);
  console.log(taskList);

  const [taskName,setTaskName] = React.useState('');
  const [taskDescription,setTaskDescription] = React.useState('');
  const [taskDate,setTaskDate] = React.useState('');
  const [isEditing,setIsEditing] = React.useState(false);
  const [editIndex,setEditIndex] = React.useState(0);
  const [pageSelector,setPageSelector] = React.useState({
    home: true,
    challenges: false,
    community: false,
    aiChatbot: false,
    setting: false
  })


  
  let h1;

  window.addEventListener('resize', function() {
    document.querySelector('.sidebar').style.height = window.innerHeight-255 + "px";
    document.querySelector('.features-dash').style.height = window.innerHeight-61 + "px";
  });
  
  console.log(isAddingFeedback);

  return (
    <div style={{display: 'flex',flexDirection: 'row'}}>
      <div className="dashboard-container">
        <img className="back" src={back}></img>
        <Sidebar setNeedsOverFlow={props.setNeedsOverFlow} setPageSelector={setPageSelector} pageSelector={pageSelector}/>
        <div className="features-dash" style={{height: window.innerHeight-61 + "px"}}>
          <AiIntro setIsAddingFeedback={setIsAddingFeedback} />
          <AiChatBot />
        </div>
      </div>
      <AddFeedback setIsAddingFeedback={setIsAddingFeedback} isAddingFeedback={isAddingFeedback}/>
    </div>
  );
}