import React from "react";
import '../Styles/AiPage.css';
import Sidebar from "../Components/Sidebar";
import back from '../Assets/Background.svg';
import Quote from "../Components/Quote";
import ToDoList from "../Components/ToDoList";
import AddTaskModal from "../Components/AddTaskModal";
import AiIntro from "../Components/AiIntro";
import CommunityInfo from "../Components/CommunityInfos";
import PostsSection from "../Components/PostsSection";

export default function CommunityPage(props){

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
      <div className="features-dash" style={{height: window.innerHeight-65 + "px"}}>
        <CommunityInfo />
        <PostsSection />
      </div>
    </div>
  );
}