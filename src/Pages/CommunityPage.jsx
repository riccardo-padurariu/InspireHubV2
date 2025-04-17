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
import AddPostModal from "../Components/AddPostModal";

export default function CommunityPage(props){

  const [postsList,setPostsList] = React.useState([]);
  const [isAddingPost,setIsAddingPost] = React.useState(false);

  const [postName,setPostName] = React.useState('');
  const [postDescription,setPostDescription] = React.useState('');
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
        <PostsSection 
          isAddingPost={isAddingPost}
          setIsAddingPost={setIsAddingPost}
          postsList={postsList}
          setPostsList={setPostsList}
        />
      </div>
      <AddPostModal
        setIsAddingPost={setIsAddingPost}
        isAddingPost={isAddingPost}
        postName={postName}
        setPostName={setPostName}
        postDescription={postDescription}
        setPostDescription={setPostDescription}
        postList={postsList}
        setPostsList={setPostsList}
      />
    </div>
  );
}