import { useLocation, useRoutes } from 'react-router-dom';
import React from 'react';
import './App.css';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import RegisterPage from './Pages/RegisterPage';
import { AuthProvider } from './Authentification/AuthContext';
import Dashboard from './Pages/Dashboard';
import AiPage from './Pages/AiPage';
import ToDoListPage from './Pages/ToDoListPage';
import ChallengesPage from './Pages/ChallengesPage';
import CommunityPage from './Pages/CommunityPage';
import SettingsPage from './Pages/SettingsPage';

function App() {

  const [needsOverflow,setNeedsOverflow] = React.useState(false);

  document.body.style.overflow = "";

  if(window.location.href === 'http://localhost:3000/' || window.location.href === 'http://localhost:3000/home')
    document.body.style.overflow = "";
  else
    document.body.style.overflow = "hidden";



  return (
    <AuthProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element = {<MainPage needsOverflow={needsOverflow} setNeedsOverflow={setNeedsOverflow}/>}></Route>
            <Route element = {<MainPage needsOverflow={needsOverflow} setNeedsOverflow={setNeedsOverflow}/>} path='/home'></Route>
            <Route element = {<LoginPage needsOverflow={needsOverflow} setNeedsOverflow={setNeedsOverflow}/>} path='/login'></Route>
            <Route element = {<RegisterPage needsOverflow={needsOverflow} setNeedsOverflow={setNeedsOverflow}/>} path='/register'></Route>
            <Route element = {<Dashboard needsOverflow={needsOverflow} setNeedsOverflow={setNeedsOverflow}/>} path='/dashboard'></Route>
            <Route element = {<AiPage needsOverflow={needsOverflow} setNeedsOverflow={setNeedsOverflow}/>} path='/dashboard/ai'></Route>
            <Route element = {<ToDoListPage needsOverflow={needsOverflow} setNeedsOverflow={setNeedsOverflow}/>} path='/dashboard/tasks'></Route>
            <Route element = {<ChallengesPage needsOverflow={needsOverflow} setNeedsOverflow={setNeedsOverflow}/>} path='/dashboard/challenges'></Route>
            <Route element = {<CommunityPage needsOverflow={needsOverflow} setNeedsOverflow={setNeedsOverflow}/>} path='/dashboard/community'></Route>
            <Route element = {<SettingsPage needsOverflow={needsOverflow} setNeedsOverflow={setNeedsOverflow}/>} path='/dashboard/settings'></Route>
          </Routes>
        </BrowserRouter>
      </div>    
    </AuthProvider>
  );
}

export default App;
