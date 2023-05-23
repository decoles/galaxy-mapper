import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Layout from './components/home/Layout';
import Login from './pages/Login';
import Logout from './pages/Logout';
import StarMap from './pages/StarMap';
import Navbar from './components/home/Navbar';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/StarMap" element={<StarMap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
