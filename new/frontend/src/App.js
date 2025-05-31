
import './App.css';
import Nav from './Components/Nav';
import Login from './Components/Login';
import { 
  BrowserRouter as Router, 
  Route, 
  Routes,
 } from 'react-router-dom';


function App() {
  return (

  <Router>
    <Nav />
    <Routes>
      <Route path="/Login" element={<Login />} />
      {/* Add more routes here as needed */}
    </Routes>
  </Router>
  
  );
}

export default App;
