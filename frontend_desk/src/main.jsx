import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx';
import Perfil from './pages/Perfil.jsx'
import Inicio from './pages/Inicio.jsx'
import Listanimales from './pages/Listanimales.jsx';
import ModificarAnimal from './pages/ModificarPet';
import Alta from './pages/AltaPet.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />}>

      <Route index element={<Inicio />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/list" element={<Listanimales />} />
      <Route path="/modificar/:id" element={<ModificarAnimal />} />
      <Route path="/alta" element={<Alta />} />
     
    </Route>
  </Routes>
</BrowserRouter>
)

