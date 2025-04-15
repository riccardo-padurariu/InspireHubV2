import React from "react";
import '../Styles/Sidebar.css';
import { useAuth } from "../Authentification/AuthContext";
import logo from '../Assets/LOGO 2.svg';
import pfp from '../Assets/iconamoon_profile-fill.svg';
import home from '../Assets/gravity-ui_house.svg';
import ch from '../Assets/tabler_bulb.svg';
import comm from '../Assets/fluent_people-community-12-filled.svg';
import ai from '../Assets/mingcute_ai-fill.svg';
import sett from '../Assets/material-symbols_settings-rounded.svg';
import stats from '../Assets/uil_statistics.svg';
import { Link } from "react-router-dom";
import homeNormal from '../Assets/gravity-ui_house (1).svg';
import chNormal from '../Assets/Vector (1).svg';
import commNormal from '../Assets/Vector (2).svg';
import aiNormal from '../Assets/Vector (3).svg';
import settNormal from '../Assets/Vector (4).svg';
import { doSignOut } from "../Authentification/Auth";
import { useNavigate } from "react-router-dom";
import line from '../Assets/Line 3.svg';
import { Database, getDatabase } from "firebase/database";
import { ref,get } from "firebase/database";
import { push,set } from "firebase/database";
import { app } from "../Authentification/Firebase";


export default function Sidebar(props) {

  const { currentUser,userLoggedIn } = useAuth();

  const navigate = useNavigate();


  function setPage(path){
    if(path === 'home'){
      props.setPageSelector({
        home: true,
        challenges: false,
        community: false,
        aiChatbot: false,
        setting: false
      }) 
    } else if(path === 'challenges'){
      props.setPageSelector({
        home: false,
        challenges: true,
        community: false,
        aiChatbot: false,
        setting: false
      })
    } else if(path === 'community'){
      props.setPageSelector({
        home: false,
        challenges: false,
        community: true,
        aiChatbot: false,
        setting: false
      })
    } else if(path === 'ai-chatbot'){
      props.setPageSelector({
        home: false,
        challenges: false,
        community: false,
        aiChatbot: true,
        setting: false
      })
    } else if(path === 'settings'){
      props.setPageSelector({
        home: false,
        challenges: false,
        community: false,
        aiChatbot: false,
        setting: true
      })
    }
  }

  const styleBoxNormal = {
    padding: '3px 13px',
    width: '211px',
    height: '40px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    border:'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '5px',
  }

  const styleAi = {
    padding: '3px 13px',
    width: '211px',
    height: '40px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    border:'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '5px',
    border: '1px solid',
    borderColor: 'white'
  }

  console.log(styleBoxNormal);

  const styleBoxSelected = {
    padding: '3px 13px',
    width: '211px',
    height: '40px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    border:'1px solid',
    borderRadius: '6px',
    cursor: 'pointer',
    background: 'linear-gradient(90deg, rgba(190, 49, 68, 0) 0%, #872341 75%)',
    borderColor: '#872341',
    marginTop: '5px'

  }

  const stylePNormal = {
    color: '#737373',
    fontSize: '17px',
    margin: 0
  }

  const stylePSelected = {
    color: 'white',
    fontSize: '17px',
    margin: 0
  }

  function isSelected(path){
    if(path === 'home'){
      return props.pageSelector.home;
    } else if(path === 'challenges'){
      return props.pageSelector.challenges;
    } else if(path === 'community'){
      return props.pageSelector.community;
    } else if(path === 'ai-chatbot'){
      return props.pageSelector.aiChatbot;
    } else if(path === 'settings'){
      return props.pageSelector.setting;
    }
    return 0;
  }

  function changePage(path) {
    if(path === 'home'){
      window.location = '/dashboard/tasks';
    } else if(path === 'challenges'){
      window.location = '/dashboard/challenges'
    } else if(path === 'community'){
      window.location = '/dashboard/community'
    } else if(path === 'ai-chatbot'){
      window.location = '/dashboard/ai'
    } else if(path === 'settings'){
      window.location = '/dashboard/settings'
    }
    setPage(path);
  }


  return (
    <div className="sidebar-container">
      <Link to={'/home'}><img className="logo-dash" src={logo}></img></Link>
      <div className="pfp">
        <img className="pfp-img" src={pfp}></img>
        <div className="infos">
          <p className="greet-dash">Welcome back, {userLoggedIn ? currentUser.displayName : ''}!</p>
          <p className="greet-email">{userLoggedIn ? currentUser.email : ''}</p>
          {/*<div className="streak-div">
            <img className="streak-img" src={stats}></img>
            <p className="streak-num">123 days</p>
          </div>*/}
          <p className="logout" onClick={() => { /*doSignOut().then(() => { window.location = '/login'; })*/ window.location = '/login'; doSignOut()}}>Logout</p>
        </div>
      </div>
      <div className="sidebar" style={{height: `${window.innerHeight-255}px`}}>
        <div className="sections-dash">
          <div className="section-dash" style={window.location.pathname === '/dashboard/tasks' ? styleBoxSelected : styleBoxNormal} onClick={() => changePage('home')}>
            <img className="section-dash-img" src={window.location.pathname === '/dashboard/tasks' ? home : homeNormal}></img>
            <p className="section-p" style={window.location.pathname === '/dashboard/tasks' ? stylePSelected : stylePNormal}>Home</p>
          </div>
          <div className="section-dash" style={window.location.pathname === '/dashboard/challenges' ? styleBoxSelected : styleBoxNormal} onClick={() => changePage('challenges')}>
            <img className="section-dash-img" src={window.location.pathname === '/dashboard/challenges' ? chNormal : ch}></img>
            <p className="section-p" style={window.location.pathname === '/dashboard/challenges' ? stylePSelected : stylePNormal}>Challenges</p>
          </div>
          <div className="section-dash" style={window.location.pathname === '/dashboard/community' ? styleBoxSelected : styleBoxNormal} onClick={() => changePage('community')}>
            <img className="section-dash-img" src={window.location.pathname === '/dashboard/community' ? commNormal : comm}></img>
            <p className="section-p" style={window.location.pathname === '/dashboard/community' ? stylePSelected : stylePNormal}>Community</p>
          </div>
        </div>
        <div className="AI-settings">
          <div className="section-dash-ai" style={window.location.pathname === '/dashboard/ai' ? styleAi : styleBoxNormal} onClick={() => changePage('ai-chatbot')}>
            <img className="section-dash-img" src={ai}></img>
            <p className="section-p" style={stylePSelected}>AI Chatbot</p>
          </div>
          <div className="section-dash" style={window.location.pathname === '/dashboard/settings' ? styleBoxSelected : styleBoxNormal} onClick={() => changePage('settings')}>
            <img className="section-dash-img" src={window.location.pathname === '/dashboard/settings' ? settNormal : sett}></img>
            <p className="section-p" style={window.location.pathname === '/dashboard/settings' ? stylePSelected : stylePNormal}>Settings</p>
          </div>
          <img src={line} style={{marginLeft: 20 + 'px',marginBottom: 10 + 'px'}}></img>
          <div className="copyright-dash">
            <p className="p1">Copyright &#169; 2025 InspireHub</p>
            <p className="p1">Prototype version 0x001</p>
          </div>
        </div>
      </div>
    </div>
  );
}