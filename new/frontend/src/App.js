import './App.css';
import Nav from './Components/Nav';
import Login from './Components/Login';
import Home from './Components/Home';
import { useEffect, useState } from 'react';
import CircleLoader from 'react-spinners/ClimbingBoxLoader';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './Components/ProtectedRouts';
import Admin from './Components/Admin';

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
          <CircleLoader size={40} color={"#36d7b7"} loading={Loading}  />
        </div>
      ) : (
        <Router>
          <Nav />
         
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/Admin" element={<Admin />} />
            </Route>  
         
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
