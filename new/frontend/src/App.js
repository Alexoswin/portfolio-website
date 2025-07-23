import './App.css';
import Nav from './Components/Nav';
import Login from './Components/Login';
import Home from './Components/Home';
import { useEffect, useState } from 'react';
import CircleLoader from 'react-spinners/HashLoader';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './Components/ProtectedRouts';
import Admin from './Components/AdminComponents/Admin';
import DarkModeToggle from './Components/DarkModeToggle';
import SkillsForm from './Components/AdminComponents/SkillForm';
import ProjectForm from './Components/AdminComponents/ProjectForm';
import EducationForm from './Components/AdminComponents/EducationForm';

import ContactMe from './Components/AdminComponents/ContactMe';
import AchievementForm from './Components/AdminComponents/AchievementForm';

import Achievement from './Components/Achievement/Achievement';


import DeleteSkills from './Components/AdminComponents/deleteData/deleteSkills';
import DeleteAchievement from './Components/AdminComponents/deleteData/deleteAchievement';

function App() {
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {Loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircleLoader id="loader" size={70} color={"#7b3dff"} loading={Loading}  />
        </div>
      ) : (
        <Router>
          <Nav />
          <DarkModeToggle/>
         
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/Admin" element={<Admin />} />
              <Route path="Admin/SkillForm" element={<SkillsForm />} />
              <Route path='Admin/ProjectForm' element={<ProjectForm/>} />
              <Route path='Admin/EducationForm' element={<EducationForm/>} />
              <Route path='/Admin/AchievementsForm' element={<AchievementForm/>}/>


              // DeleteRoute
              <Route path='/Admin/deleteSkills' element={<DeleteSkills/>} />
              <Route path='/Admin/deleteAchievements' element={<DeleteAchievement/>} />
            </Route>  
           
            <Route path='/ContactMe' element={<ContactMe/>} />
            <Route path='/Achievement' element={<Achievement/>} />
           
          </Routes> 
        </Router>
      )}
    </>
  );
}

export default App;
