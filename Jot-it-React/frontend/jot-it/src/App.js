//@author: Brandon Walton
//App 

import React from 'react';
import './CSS/Dashboard.css';
import Dashboard from './views/Dashboard';
import Login from './views/LoginPage';
import SignUp from './views/SignUp';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {


  return (
    <Router>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;

