import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />}>

      <Route index element={<Login />} />
      
      <Route path="/register" element={<Register />} />
     
    </Route>
  </Routes>
</BrowserRouter>
)