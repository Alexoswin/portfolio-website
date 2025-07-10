import './App.css';
import Nav from './Components/Nav';
import Login from './Components/Login';
import Home from './Components/Home';
import { useEffect, useState } from 'react';
import CircleLoader from 'react-spinners/HashLoader';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './Components/ProtectedRouts';
import Admin from './Components/Admin';
import DarkModeToggle from './Components/DarkModeToggle';
import SkillsForm from './Components/AdminComponents/SkillForm';
import ProjectForm from './Components/AdminComponents/ProjectForm';
import EducationForm from './Components/AdminComponents/EducationForm';
import EducationPage from './Components/EducationPage';
import ContactMe from './Components/AdminComponents/ContactMe';
import AchievementForm from './Components/AdminComponents/AchievementForm';

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
            </Route>  
            <Route path="/EducationData" element={<EducationPage/>} />
            <Route path='ContactMe' element={<ContactMe/>} />
           
          </Routes> 
        </Router>
      )}
    </>
  );
}

export default App;
