import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import FetchPatient from './Components/FetchPatient';
import CreatePatient from "./Components/CreatePatient";
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/fetchPatient' element={<FetchPatient />} />
        <Route path='/patient' element={<CreatePatient />} />

      </Routes>
    </Router>
  );
}

export default App;
