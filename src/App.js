import { useLocation, useRoutes } from 'react-router-dom';
import React from 'react';
import './App.css';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import RegisterPage from './Pages/RegisterPage';
import { AuthProvider, useAuth } from './Authentification/AuthContext';
import Dashboard from './Pages/Dashboard';
import AiPage from './Pages/AiPage';
import ToDoListPage from './Pages/ToDoListPage';
import ChallengesPage from './Pages/ChallengesPage';
import CommunityPage from './Pages/CommunityPage';
import SettingsPage from './Pages/SettingsPage';
import { app } from './Authentification/Firebase';
import { getDatabase } from 'firebase/database';
import { ref } from 'firebase/database';
import PostPage from './Pages/PostPage';
import { onValue } from 'firebase/database';

function AppContent() {
  const [needsOverflow,setNeedsOverflow] = React.useState(false);
  const [arr,setArr] = React.useState([]);
  const auth = useAuth();
  const { currentUser } = auth;

  document.body.style.overflow = "";

  if(window.location.href === 'http://localhost:3000/' || window.location.href === 'http://localhost:3000/home')
    document.body.style.overflow = "";
  else
    document.body.style.overflow = "hidden";
  
  React.useEffect(() => {
    if(!currentUser) return;

    const db = getDatabase(app);
    const userTasksRef = ref(db, `posts`);

    const unsubscribe = onValue(userTasksRef, (snapshot) => {
      if(snapshot.exists()){
        const taskData = snapshot.val();

        const tasksArray = Object.entries(taskData).map(([key,value]) => ({
          ...value,
          firebaseKey: key
        }))

        setArr(tasksArray);
      }else{
        setArr([]);
      }
    }, (error) => {
      console.log('Error fetching tasks: ', error);
    });

    return () => unsubscribe();
  }, [currentUser]);

  return (
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
        {
          arr.map((item) => 
            <Route
              element = {<PostPage postKey={item.firebaseKey}/>}
              path = {`/dashboard/community/${item.firebaseKey}`}
            ></Route>
          )
        }
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
