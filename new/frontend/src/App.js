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

import EducationPage from './Components/EducationPage';
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
              <Route path="/SkillForm" element={<SkillsForm />} />
            </Route>  
            <Route path="/EducationData" element={<EducationPage/>} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
