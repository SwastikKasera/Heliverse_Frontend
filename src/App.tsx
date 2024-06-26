import React from 'react'
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';

function App() {
  return (
    <div className="flex w-full h-screen gap-3 flex-wrap bg-neutral-900">
      <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
