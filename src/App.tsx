import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Companies from './Components/Companies';
import UpdateCompany from './Components/UpdateCompany';
import AddCompany from './Components/AddCompany';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Companies />} />
        <Route path='/edit/:id' element={<UpdateCompany />} />
        <Route path='/add-company' element={<AddCompany />} />
      </Routes>
    </Router>
  );
}

export default App;
