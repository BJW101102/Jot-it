import React from 'react';
import './CSS/Dashboard.css';
import Dashboard from './views/Dashboard';
import Login from './views/LoginPage';
import SignUp from './views/SignUp';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {

  return (
    <Router>
      <nav>
      <Link to="/login"><button type="button" className="btn btn-outline-success">Login</button>
</Link>
        <Link to="/dashboard"><button type="button" className="btn btn-outline-warning">Dashboard</button></Link>
        <Link to="/signup"><button type="button" className="btn btn-outline-danger">Signup</button></Link>

      </nav>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path ="/signup" element={<SignUp/>}/>
      </Routes>
    </Router>
  );
}

export default App;

