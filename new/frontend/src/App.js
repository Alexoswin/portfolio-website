import './App.css';
import Nav from './Components/Nav';
import Login from './Components/Login';
import Profile from './Components/Profile';
import { useEffect, useState } from 'react';
import CircleLoader from 'react-spinners/CircleLoader';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
          <CircleLoader size={150} color={"#36d7b7"} loading={Loading}  />
        </div>
      ) : (
        <Router>
          <Nav />
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/" element={<Profile />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
