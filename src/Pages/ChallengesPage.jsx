import React from "react";
import Sidebar from "../Components/Sidebar";
import back from '../Assets/Background.svg';
import Quote from "../Components/Quote";
import ToDoList from "../Components/ToDoList";
import AddTaskModal from "../Components/AddTaskModal";

export default function ChallengesPage(props) {

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

  if(window.location.href === 'http://localhost:3000/home')
    document.body.style.overflow = "";
  else
    document.body.style.overflow = "hidden";

    let h1 = pageSelector.home ? 242 : 100;

    window.addEventListener('resize', function() {
      document.querySelector('.sidebar').style.height = window.innerHeight-255 + "px";
      document.querySelector('.features-dash').style.height = window.innerHeight-55 + "px";
    });

    const styles = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    }
  
    const PStyle = {
      fontSize: '40px',
      color: 'white'
    }

  return (
    <div className="dashboard-container">
      <img className="back" src={back}></img>
      <Sidebar setNeedsOverFlow={props.setNeedsOverFlow} setPageSelector={setPageSelector} pageSelector={pageSelector}/>
      <div className="features-dash" style={styles}>
        <p style={PStyle}>Coming soon...</p>
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
      />
    </div>
  );
}