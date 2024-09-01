import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import Home from './Components/Home';
import Remove from './Components/remove';




const App = () => {
  return (
    <div className='app'>
      
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/home' element={<Home />} />
        <Route path='/remove' element={<Remove />} />
      </Routes>
   
    </div>
  );
};

export default App;
