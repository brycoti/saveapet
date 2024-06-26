import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import App from './App.jsx'
import Inicio from './pages/Inicio.jsx';
import Profile from './pages/Profile.jsx';
import Cuestionario from './pages/Cuestionario.jsx';
import Settings from './pages/Settings.jsx';
import PetEspecific from './pages/PetEspecific.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />}>

          <Route index element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cuestionario" element={<Cuestionario />} />
          <Route path="/settings" element={<Settings />} />
          <Route path='/pet/:id' element={<PetEspecific />} />
        </Route>
      </Routes>
    </React.StrictMode>
  </BrowserRouter >
)
